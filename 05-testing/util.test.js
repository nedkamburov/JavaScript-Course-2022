const puppeteer = require("puppeteer");
const { generateText, checkAndGenerate } = require("./util");

test("Should output name and age", () => {
  // Unit test
  const text = generateText("Max", 29);
  expect(text).toBe("Max (29 years old)");
  const text2 = generateText("Anna", 28);
  expect(text2).toBe("Anna (28 years old)");
});

test("Should output data-less text", () => {
  // Unit test
  const text = generateText("", null);
  expect(text).toBe(" (null years old)");
});

test("Should generate a valid text output data-less text", () => {
  // Integration test
  const text = checkAndGenerate("Max", 29);
  expect(text).toBe("Max (29 years old)");
});

test("Should click around", async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 80,
    args: ["--window-size=1920,1080"],
  });

  const page = await browser.newPage();
  await page.goto(
    "file:///Users/nkamb/Desktop/JavaScript-Course-2022/05-testing/index.html"
  );

  await page.click("input#name");
  await page.type("input#name", "Anna");
  await page.click("input#age");
  await page.type("input#age", '29');
  await page.click('#btnAddUser');
  const finalText = await page.$eval('.user-item', el => el.textContent);
  expect(finalText).toBe('Anna (29 years old)');
  
  await page.waitForTimeout(2000)
  await browser.close();
}, 10000);
