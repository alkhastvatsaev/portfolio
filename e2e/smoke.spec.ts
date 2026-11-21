import { expect, test } from "@playwright/test";

/** Go to panel 2 once the page is interactive (retries until the counter says 02). */
async function gotoPanel2(page: import("@playwright/test").Page) {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Sections" });
  await expect(async () => {
    await page.getByRole("button", { name: "Suivant" }).click();
    await expect(nav).toContainText("02 / 09", { timeout: 1500 });
  }).toPass({ timeout: 10000 });
  await page.waitForTimeout(600);
  return nav;
}

for (const route of ["/", "/en"]) {
  test(`one page ${route} renders every section`, async ({ page }) => {
    const response = await page.goto(route, { waitUntil: "domcontentloaded" });
    expect(response?.ok()).toBeTruthy();
    for (const id of ["top", "preuves", "nota", "shmot", "moon", "alkhast-homes", "stack", "methode", "contact"]) {
      await expect(page.locator(`#${id}`)).toBeAttached();
    }
  });
}

test("home leads with the key message and numbers", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Alkhast Vatsaev");
  await expect(page.locator("#methode")).toContainText("tests");
});

test("sitemap lists both languages", async ({ request }) => {
  const body = await (await request.get("/sitemap.xml")).text();
  expect(body).toContain("https://alkhastvatsaev.dev/en");
});

test("the page scrolls horizontally, not vertically", async ({ page }) => {
  await gotoPanel2(page);
  await page.mouse.move(640, 120);
  await page.mouse.wheel(0, 400); // vertical wheel → next panel, page itself never scrolls down
  await expect(page.getByRole("navigation", { name: "Sections" })).toContainText("03 / 09");
  expect(await page.evaluate(() => window.scrollY)).toBe(0);
});

test("cards on panel 2 can be dragged (no native image drag)", async ({ page }) => {
  await gotoPanel2(page);
  const line = page.locator(".card-wrapper").first().locator("xpath=..");

  await page.evaluate(() => {
    (window as unknown as { __drags: number }).__drags = 0;
    document.addEventListener("dragstart", () => {
      (window as unknown as { __drags: number }).__drags++;
    });
  });
  const readX = () =>
    line.evaluate((el) => new DOMMatrixReadOnly(getComputedStyle(el).transform).m41);

  const before = await readX();
  await page.mouse.move(400, 400);
  await page.mouse.down();
  for (let i = 1; i <= 10; i++) await page.mouse.move(400 + i * 40, 400);
  const during = await readX();
  await page.mouse.up();

  expect(during - before).toBeGreaterThan(300); // the row followed the mouse
  expect(await page.evaluate(() => (window as unknown as { __drags: number }).__drags)).toBe(0);
  // still on panel 2: dragging cards must not change panels
  await expect(page.getByRole("navigation", { name: "Sections" })).toContainText("02 / 09");
});

test("a horizontal trackpad swipe on the cards moves the cards, not the page", async ({ page }) => {
  await gotoPanel2(page);
  await page.mouse.move(640, 400);
  await page.mouse.wheel(250, 0);
  await page.waitForTimeout(900);
  await expect(page.getByRole("navigation", { name: "Sections" })).toContainText("02 / 09");
});

/** x (CSS px) of the brightest column of the scanner sparks, and of the scanner line. */
async function scannerAlignment(page: import("@playwright/test").Page) {
  return page.evaluate(() => {
    const section = document.getElementById("preuves")!;
    const canvases = section.querySelectorAll("canvas");
    const sparks = canvases[1] as HTMLCanvasElement;
    const ctx = sparks.getContext("2d")!;
    const { width, height } = sparks;
    const data = ctx.getImageData(0, 0, width, height).data;
    const columns = new Float64Array(width);
    for (let y = 0; y < height; y += 2)
      for (let x = 0; x < width; x++) columns[x] += data[(y * width + x) * 4 + 3];
    // Sparks are born on the line and only drift right: take the left edge of the glow.
    let max = 0;
    for (let x = 0; x < width; x++) if (columns[x] > max) max = columns[x];
    let best = 0;
    while (best < width - 1 && columns[best] < max * 0.25) best++;
    const rect = sparks.getBoundingClientRect();
    const sparksX = rect.left + (best / width) * rect.width;
    const line = section.querySelector(".scanner-line")!.getBoundingClientRect();
    return { sparksX, lineX: line.left + line.width / 2 };
  });
}

test("scanner sparks stay on the scanner line, even after a resize", async ({ page }) => {
  await gotoPanel2(page);
  let a = await scannerAlignment(page);
  expect(Math.abs(a.sparksX - a.lineX)).toBeLessThan(5);

  for (const width of [900, 1600]) {
    await page.setViewportSize({ width, height: 800 });
    await page.waitForTimeout(700);
    await page.getByRole("button", { name: "Suivant" }).click(); // re-snap on panel 2 after resize
    await page.getByRole("button", { name: "Précédent" }).click();
    await page.waitForTimeout(900);
    a = await scannerAlignment(page);
    expect(Math.abs(a.sparksX - a.lineX), `width ${width}`).toBeLessThan(5);
  }
});

for (const [w, h] of [[1280, 720], [390, 844], [375, 667]]) {
  test(`no vertical scroll anywhere at ${w}x${h}: every panel fits the screen`, async ({ page }) => {
    await page.setViewportSize({ width: w, height: h });
    await page.goto("/");
    await page.waitForTimeout(600);
    const result = await page.evaluate(() => {
      const panels = [...document.querySelectorAll("[data-fit]")].map((fit) => {
        const box = (fit.parentElement as HTMLElement).getBoundingClientRect();
        const r = fit.getBoundingClientRect();
        return {
          id: fit.closest("section")!.id,
          fits: r.top >= box.top - 1 && r.bottom <= box.bottom + 1,
          scale: r.height / (fit as HTMLElement).offsetHeight,
        };
      });
      return { panels, pageScrolls: document.documentElement.scrollHeight > innerHeight };
    });
    expect(result.pageScrolls).toBe(false);
    for (const p of result.panels) {
      expect(p.fits, p.id).toBe(true);
      expect(p.scale, `${p.id} text would be too small`).toBeGreaterThan(0.65);
    }
  });
}

test("one Mac trackpad swipe (with momentum) moves exactly one panel", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await page.waitForTimeout(1000);
  const nav = page.getByRole("navigation", { name: "Sections" });
  await page.mouse.move(700, 300);
  const swipe = async () => {
    for (let i = 0; i < 100; i++) {
      await page.mouse.wheel(0, Math.max(1, Math.round(60 * Math.exp(-i / 25))));
      await page.waitForTimeout(16);
    }
    await page.waitForTimeout(900);
  };
  await swipe();
  await expect(nav).toContainText("02 / 09");
  await swipe();
  await expect(nav).toContainText("03 / 09");
});

test("resizing the window keeps the current panel perfectly framed", async ({ page }) => {
  await gotoPanel2(page);
  await page.getByRole("button", { name: "Suivant" }).click();
  await page.waitForTimeout(900);
  for (const width of [900, 1600, 1280]) {
    await page.setViewportSize({ width, height: 800 });
    await page.waitForTimeout(500);
    const offset = await page.evaluate(() => {
      const d = document.querySelector("main > div.flex") as HTMLElement;
      return { mod: d.scrollLeft % d.clientWidth, index: Math.round(d.scrollLeft / d.clientWidth) };
    });
    expect(offset.mod, `width ${width}`).toBeLessThan(2);
    expect(offset.index).toBe(2);
  }
});
