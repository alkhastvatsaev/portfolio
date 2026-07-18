import { expect, test } from "@playwright/test";

const htmlRoutes = [
  "/fr",
  "/fr/pour-recruteurs",
  "/fr/projets",
  "/fr/articles/comment-verifier-le-travail-dun-developpeur-junior",
  "/fr/developpeur-full-stack",
] as const;

for (const route of htmlRoutes) {
  test(`smoke ${route} returns 200 and renders`, async ({ page }) => {
    const response = await page.goto(route, { waitUntil: "domcontentloaded" });
    expect(response?.ok()).toBeTruthy();
    await expect(page.locator("header.site-header")).toBeVisible();
    await expect(page.locator("#main-content")).toBeVisible();
  });
}

test("smoke /sitemap.xml returns 200 with portfolio URLs", async ({
  request,
}) => {
  const response = await request.get("/sitemap.xml");
  expect(response.ok()).toBeTruthy();
  const body = await response.text();
  expect(body).toContain("alkhastvatsaev.dev");
  expect(body).toContain("/fr/pour-recruteurs");
});

test("French home exposes recruiter and projects entry points", async ({
  page,
}) => {
  await page.goto("/fr");
  const nav = page.getByRole("navigation", { name: "Navigation principale" });
  await expect(nav.getByRole("link", { name: "Recruteurs" })).toBeVisible();
  await expect(nav.getByRole("link", { name: "Projets" })).toBeVisible();
});
