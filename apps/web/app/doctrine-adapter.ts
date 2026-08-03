import { doctrine as localDoctrine } from "@overengineered/content";
import { DoctrineSchema, type Doctrine } from "@overengineered/contracts";

const query = `query DoctrinePage { doctrine { title subtitle introduction status principles { id title body order } operatingQuestions buildFacts { label value } } }`;
export async function getDoctrine(): Promise<{
  doctrine: Doctrine;
  source: "gateway" | "local-continuity";
}> {
  if (process.env.DOCTRINE_SOURCE === "local") {
    return { doctrine: localDoctrine, source: "local-continuity" };
  }

  const url =
    process.env.GATEWAY_URL ??
    process.env.NEXT_PUBLIC_GATEWAY_URL ??
    "http://localhost:4000/graphql";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ query }),
      next: { revalidate: 60 },
    });
    if (!response.ok) throw new Error(`Gateway response ${response.status}`);
    const payload = (await response.json()) as {
      data?: { doctrine?: unknown };
      errors?: unknown[];
    };
    if (payload.errors?.length || !payload.data?.doctrine)
      throw new Error("Gateway returned no doctrine");
    return { doctrine: DoctrineSchema.parse(payload.data.doctrine), source: "gateway" };
  } catch {
    if (process.env.ENABLE_DOCTRINAL_FALLBACK === "false")
      throw new Error("Doctrine unavailable and continuity mechanism disabled");
    return { doctrine: localDoctrine, source: "local-continuity" };
  }
}
