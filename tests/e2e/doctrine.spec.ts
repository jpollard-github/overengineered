import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test("page loads all doctrine and build details", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Build the Smallest Honest Thing" }),
  ).toBeVisible();
  await expect(page.locator(".principle-card")).toHaveCount(11);
  await expect(page.getByText("User-visible pages")).toBeVisible();
  await page.getByText("Build information").click();
  await expect(page.getByText("Content route")).toBeVisible();
});
test("accessibility has no automatically detectable serious violations", async ({ page }) => {
  await page.goto("/");
  const results = await new AxeBuilder({ page }).analyze();
  expect(
    results.violations.filter((violation) =>
      ["serious", "critical"].includes(violation.impact ?? ""),
    ),
  ).toEqual([]);
});
test("mobile has no horizontal overflow and keyboard reaches content", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= document.documentElement.clientWidth,
    ),
  ).toBe(true);
  await page.keyboard.press("Tab");
  await expect(page.locator(".skip-link")).toBeFocused();
});
