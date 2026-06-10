import { chromium } from "playwright";

const base = "http://localhost:3000";

const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

await page.goto(`${base}/bulls`, { waitUntil: "networkidle" });
// scroll through so any in-view animations trigger, then settle
await page.evaluate(async () => {
  for (let y = 0; y < document.body.scrollHeight; y += 400) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 120));
  }
  window.scrollTo(0, 0);
});
await page.waitForTimeout(1500);

const cards = await page.$$eval('a[href^="/bulls/"]', (els) =>
  els
    .filter((e) => e.querySelector("h3"))
    .map((e) => {
      const name = e.querySelector("h3")?.textContent?.trim();
      const cs = getComputedStyle(e);
      const r = e.getBoundingClientRect();
      return { name, opacity: cs.opacity, w: Math.round(r.width), h: Math.round(r.height) };
    }),
);
console.log("BULL CARDS:", JSON.stringify(cards, null, 0));

// Full-page screenshot (real render, animations settled)
await page.screenshot({ path: ".review/bulls-real.png", fullPage: true });

await page.goto(`${base}/`, { waitUntil: "networkidle" });
await page.waitForTimeout(1800);
const h1 = await page.$eval("h1", (e) => ({
  text: e.textContent?.replace(/\s+/g, " ").trim(),
  opacity: getComputedStyle(e).opacity,
}));
console.log("HOME H1:", JSON.stringify(h1));
await page.screenshot({ path: ".review/home-real.png" });

await browser.close();
console.log("OK");
