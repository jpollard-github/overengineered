import type { Meta, StoryObj } from "@storybook/react";
import { BuildFactsGrid, PrincipleCard, StatusBadge } from "./index";
const meta = { title: "Doctrine/States", component: PrincipleCard } satisfies Meta<
  typeof PrincipleCard
>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Principle: Story = {
  args: {
    principle: {
      id: "inspect",
      order: 2,
      title: "Inspect the actual artifact",
      body: "Read the thing itself before designing around a summary.",
    },
  },
};
export const OperationalStatus = () => (
  <StatusBadge>All systems operational; purpose remains under review.</StatusBadge>
);
export const BuildFacts = () => (
  <BuildFactsGrid
    facts={[
      { label: "User-visible pages", value: "1" },
      { label: "Packages", value: "too many" },
    ]}
  />
);
export const EmptyState = () => <p>No doctrine was returned. This state should never occur.</p>;
export const PolicyDenied = () => <p role="alert">Public content display was denied by policy.</p>;
export const BackendUnavailableFallback = () => (
  <StatusBadge>Controlled doctrinal continuity is active.</StatusBadge>
);
