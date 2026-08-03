import { createServer } from "node:http";
import { createSchema, createYoga } from "graphql-yoga";
import { DoctrineSchema } from "@overengineered/contracts";
import {
  correlationId,
  initializeTelemetry,
  spanNames,
  withSpan,
} from "@overengineered/observability";
import { evaluatePublicContentPolicy } from "@overengineered/policy-engine";
import { parseGatewayConfig } from "@overengineered/runtime-config";

initializeTelemetry("gateway");
const config = parseGatewayConfig(process.env);
const typeDefs = /* GraphQL */ `
  type Principle {
    id: ID!
    title: String!
    body: String!
    order: Int!
  }
  type BuildFact {
    label: String!
    value: String!
  }
  type Doctrine {
    title: String!
    subtitle: String!
    introduction: String!
    principles: [Principle!]!
    operatingQuestions: [String!]!
    buildFacts: [BuildFact!]!
    status: String!
  }
  type Query {
    doctrine: Doctrine!
  }
`;
const schema = createSchema({
  typeDefs,
  resolvers: {
    Query: {
      doctrine: async (_root, _args, context: { request: Request }) =>
        withSpan(spanNames.gatewayDoctrine, async () => {
          const decision = evaluatePublicContentPolicy();
          if (!decision.allowed) throw new Error(`POLICY_DENIED:${decision.reasonCode}`);
          const id = correlationId(context.request.headers.get("x-correlation-id") ?? undefined);
          const response = await fetch(`${config.API_URL}/v1/doctrine`, {
            headers: { "x-correlation-id": id },
          });
          if (!response.ok) throw new Error(`Doctrine API returned ${response.status}`);
          return DoctrineSchema.parse(await response.json());
        }),
    },
  },
});
const yoga = createYoga({
  schema,
  graphqlEndpoint: "/graphql",
  cors: { origin: "*", methods: ["POST", "GET", "OPTIONS"] },
});
const server = createServer(yoga);
server.listen(config.GATEWAY_PORT, "0.0.0.0", () =>
  console.log(
    JSON.stringify({
      level: "info",
      service: "gateway",
      port: config.GATEWAY_PORT,
      message: "GraphQL translation authority listening",
    }),
  ),
);
