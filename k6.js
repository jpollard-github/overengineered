import http from "k6/http";
import { check } from "k6";
export const options = {
  vus: 25,
  duration: "30s",
  thresholds: { http_req_failed: ["rate<0.01"], http_req_duration: ["p(95)<500"] },
};
export default function () {
  const response = http.get(__ENV.BASE_URL ?? "http://localhost:4001/v1/doctrine");
  check(response, { "doctrine survives disproportionate interest": (r) => r.status === 200 });
}
