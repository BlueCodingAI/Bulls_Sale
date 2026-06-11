import { chromium } from "playwright";
import { mkdirSync } from "fs";

const base = "http://localhost:3000";
mkdirSync(".review", { recursive: true });

const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

async function settle() {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 500) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 90));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(1400);
}

const pages = [
  ["/", "home"],
  ["/bulls", "bulls"],
  ["/cows", "cows"],
  ["/why-limousin", "why"],
  ["/about", "about"],
  ["/contact", "contact"],
];

for (const [path, name] of pages) {
  await page.goto(`${base}${path}`, { waitUntil: "networkidle" });
  await settle();
  await page.screenshot({ path: `.review/${name}.png`, fullPage: true });
  const info = await page.evaluate(() => ({
    title: document.title,
    h1: document.querySelector("h1")?.textContent?.replace(/\s+/g, " ").trim(),
    nav: [...document.querySelectorAll("header nav a, header nav span")]
      .map((e) => e.textContent.trim())
      .filter(Boolean),
    sold: document.querySelectorAll("span")
      ? [...document.querySelectorAll("span")].filter((s) => s.textContent.trim() === "Sold").length
      : 0,
  }));
  console.log(name.toUpperCase(), JSON.stringify(info));
}

await browser.close();
console.log("OK");
