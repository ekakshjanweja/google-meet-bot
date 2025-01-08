import { Browser, Builder, By, until } from "selenium-webdriver";
import { Options } from "selenium-webdriver/chrome";

export async function main() {
  const options = new Options();
  options.addArguments("--disable-blink-features=AutomationControlled");
  options.addArguments("--use-fake-ui-for-media-stream");
  const driver = await new Builder()
    .forBrowser(Browser.CHROME)
    .setChromeOptions(options)
    .build();

  try {
    await driver.get("https://meet.google.com/zqi-usnz-cag");
    await driver.sleep(3000);

    const popupBtn = await driver.wait(
      until.elementLocated(By.xpath("//span[contains(text(),'Got it')]")),
      10000
    );

    await popupBtn.click();

    const nameInput = await driver.wait(
      until.elementLocated(By.xpath("//input[@placeholder='Your name']")),
      10000
    );
    await nameInput.clear();
    await nameInput.click();
    await nameInput.sendKeys("bot");
    const btnInput = driver.wait(
      until.elementLocated(
        By.xpath(
          "//span[contains(text(), 'Join') or contains(text(), 'Ask to join')]"
        )
      ),
      10000
    );
    btnInput.click();

    await driver.wait(until.elementLocated(By.id("dfbdrb")), 10000);
  } finally {
    await driver.quit();
  }
}
