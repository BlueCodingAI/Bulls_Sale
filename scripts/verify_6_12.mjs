import { chromium } from "playwright";
import { mkdirSync } from "fs";

const base = "http://localhost:3000";
mkdirSync(".review/6_12", { recursive: true });

const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

async function settle() {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 500) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 80));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(1300);
}

const text = (sel) =>
  page.$eval(sel, (e) => e.textContent.replace(/\s+/g, " ").trim()).catch(() => null);
const bodyText = () =>
  page.evaluate(() => document.body.innerText.replace(/\s+/g, " ").trim());

const out = {};

// ---------- HOME ----------
await page.goto(`${base}/`, { waitUntil: "networkidle" });
await settle();
await page.screenshot({ path: ".review/6_12/home.png", fullPage: true });
{
  const body = await bodyText();
  out.home = {
    virginBulls: body.includes("We sell our virgin bulls at 22–24 months old"),
    docilityNew: body.includes("offer some of the easiest handling bulls in the state"),
    calvingTrimmed: !body.includes("60–65 lb calves that wean off"),
    droppedOnlyThingWeRaise: !body.includes("the only thing we raise"),
    heroLocation: await text("section p"),
    footerNoCo: !body.includes("Cattle Co."),
    bruce: body.includes("(903) 263-7155"),
    victoria: body.includes("(903) 631-9363"),
    garyTX: body.includes("Gary, TX"),
  };
}

// ---------- WHY ----------
await page.goto(`${base}/why-limousin`, { waitUntil: "networkidle" });
await settle();
await page.screenshot({ path: ".review/6_12/why.png", fullPage: true });
{
  const body = await bodyText();
  out.why = {
    introTrimmed: !body.includes("with old-world Limousin in the mix for those who want it"),
    introEndsClean: body.includes("we built our program around Lim-Flex genetics."),
  };
}

// ---------- ABOUT ----------
await page.goto(`${base}/about`, { waitUntil: "networkidle" });
await settle();
await page.screenshot({ path: ".review/6_12/about.png", fullPage: true });
{
  const body = await bodyText();
  out.about = {
    storyHasLimFlex: body.includes("the best Lim-Flex and Limousin bulls we can possibly raise"),
    noDog: !body.includes("very important dog") && !body.includes("one very good dog"),
    threeGenClean: body.includes("Three generations make Rocking C Cattle what it is."),
    victoriaFirst:
      body.indexOf("Bruce & Victoria Caylor, and Kimber") <
      body.indexOf("Bruce & Sherry Caylor"),
    victoriaBlurb: body.includes("spent countless hours studying genetics"),
    sherryQuoteKept: body.includes("the best money I ever made with cattle"),
    sherryMiddleRemoved: !body.includes("provide wisdom as a generation"),
    noRoles: !body.includes("THE ORIGINAL RANCHERS") && !body.includes("Owners, herd managers"),
    breedingNew: body.includes("they grow at an explosive rate"),
    breedingOldGone: !body.includes("two-year-olds run 1,400"),
  };
}

// ---------- BULL DETAIL (Marvin) ----------
await page.goto(`${base}/bulls/marvin`, { waitUntil: "networkidle" });
await settle();
await page.screenshot({ path: ".review/6_12/bull-marvin.png", fullPage: true });
{
  const body = await bodyText();
  const specLabels = await page.$$eval("dl dt", (els) =>
    els.map((e) => e.textContent.trim()),
  );
  const specVals = await page.$$eval("dl dd", (els) => els.map((e) => e.textContent.trim()));
  const buttons = await page.$$eval("a", (els) =>
    els
      .map((e) => e.textContent.replace(/\s+/g, " ").trim())
      .filter((t) => /contact us|call us|see available/i.test(t)),
  );
  out.bull = {
    specLabels,
    specSample: specVals.slice(0, 6),
    hasReg: specLabels.includes("Reg. #"),
    noColor: !specLabels.includes("Color"),
    noPolled: !specLabels.includes("Polled"),
    ageInMonths: specVals.some((v) => /\bmos?\b/.test(v)),
    ctaButtons: buttons,
    noCallUs: !buttons.some((b) => /call us/i.test(b)),
    descriptionSectionGone: !body.includes("About Marvin"),
    epdsSubtitleClean:
      body.includes("Expected Progeny Differences.") &&
      !body.includes("Sample figures shown"),
  };
}

// ---------- COWS ----------
await page.goto(`${base}/cows`, { waitUntil: "networkidle" });
await settle();
await page.screenshot({ path: ".review/6_12/cows.png", fullPage: true });
out.cows = { h1: await text("h1"), body: (await bodyText()).slice(0, 80) };

// ---------- CONTACT ----------
await page.goto(`${base}/contact`, { waitUntil: "networkidle" });
await settle();
await page.screenshot({ path: ".review/6_12/contact.png", fullPage: true });
{
  const body = await bodyText();
  out.contact = {
    bruce: body.includes("(903) 263-7155"),
    victoria: body.includes("(903) 631-9363"),
    facebook: await page
      .$$eval("a[href]", (els) =>
        els.map((e) => e.getAttribute("href")).filter((h) => h && h.includes("facebook")),
      )
      .catch(() => []),
  };
}

console.log(JSON.stringify(out, null, 2));
await browser.close();
console.log("VERIFY_DONE");
