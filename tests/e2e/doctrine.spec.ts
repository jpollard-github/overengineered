import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test("page loads all doctrine and build details", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Build the Smallest Honest Thing" }),
  ).toBeVisible();
  await expect(page.locator(".principle-card")).toHaveCount(11);
  await expect(page.getByText("User-visible pages")).toBeVisible();
  const githubLink = page.getByRole("link", { name: "View Overengineered on GitHub" });
  await expect(githubLink).toBeVisible();
  await expect(githubLink).toHaveAttribute(
    "href",
    "https://github.com/jpollard-github/overengineered",
  );
  await expect(githubLink).toHaveAttribute("target", "_blank");
  await expect(githubLink).toHaveAttribute("rel", "noreferrer noopener");
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
  await expect(page.getByRole("navigation", { name: "On this page" })).toBeHidden();
  await expect(page.getByRole("link", { name: "View Overengineered on GitHub" })).toBeVisible();
  await page.keyboard.press("Tab");
  await expect(page.locator(".skip-link")).toBeFocused();
});
