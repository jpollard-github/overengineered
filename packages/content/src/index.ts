import type { Doctrine } from "@overengineered/contracts";

export const doctrine = {
  title: "Build the Smallest Honest Thing",
  subtitle:
    "A practical doctrine for software that solves the problem without founding a new civilization around it.",
  introduction:
    "Useful software begins with an accurate reading of the problem. These principles keep the solution close to the visible need, preserve the person’s intent, and leave room for the work to end.",
  principles: [
    {
      id: "name-the-failure",
      title: "Name the visible failure",
      body: "Describe what is observably wrong before proposing a remedy. Diagnosis precedes design.",
      order: 1,
    },
    {
      id: "inspect-the-artifact",
      title: "Inspect the actual artifact",
      body: "Read the code, document, interface, or behavior itself. Do not solve a summary when the evidence is available.",
      order: 2,
    },
    {
      id: "challenge-the-premise",
      title: "Challenge the premise",
      body: "Ask whether the requested mechanism is necessary before designing architecture around it.",
      order: 3,
    },
    {
      id: "diagnosis-over-tone",
      title: "Do not substitute tone management for diagnosis",
      body: "Kindness matters, but polished reassurance cannot replace a clear account of what failed.",
      order: 4,
    },
    {
      id: "judgment-over-process",
      title: "Do not add process because judgment feels risky",
      body: "A checklist cannot make a decision for you. Add process only when it prevents a known, repeated failure.",
      order: 5,
    },
    {
      id: "question-not-product",
      title: "Do not convert a direct question into a product",
      body: "Answer the question at the scale it was asked. A useful response need not become a platform.",
      order: 6,
    },
    {
      id: "stop-at-protection",
      title: "Stop when structure protects the project from judgment",
      body: "If a layer exists mainly to postpone a decision or disperse responsibility, it is not helping the user.",
      order: 7,
    },
    {
      id: "preserve-intent",
      title: "Preserve the user’s wording and objective",
      body: "Change the interpretation only when asked or when evidence makes the original reading impossible.",
      order: 8,
    },
    {
      id: "correction-is-evidence",
      title: "Treat repeated correction as evidence",
      body: "When the same misunderstanding returns, assume the interpretation is wrong—not that the request needs more explanation.",
      order: 9,
    },
    {
      id: "solve-and-stop",
      title: "Software can solve a mundane problem and stop",
      body: "Completion is a legitimate architecture. Not every useful change needs a roadmap.",
      order: 10,
    },
    {
      id: "exact-size",
      title: "Make the change exactly the size of the change",
      body: "Do the smallest complete thing: no less than the problem requires and no more than the evidence supports.",
      order: 11,
    },
  ],
  operatingQuestions: [
    "What visibly failed?",
    "Did we inspect the actual artifact?",
    "Are we solving the user’s problem or our discomfort with judgment?",
    "What is the smallest complete change?",
    "What can stop now?",
  ],
  buildFacts: [
    { label: "User-visible pages", value: "1" },
    { label: "Deployable applications", value: "5" },
    { label: "Packages", value: "too many" },
    { label: "Governance documents", value: "regrettably current" },
  ],
  status: "All systems operational; purpose remains under review.",
} satisfies Doctrine;

export const loadDoctrine = (): Doctrine => doctrine;
