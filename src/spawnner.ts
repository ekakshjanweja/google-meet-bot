import { By, until, WebDriver } from "selenium-webdriver";

export async function spawnner(driver: WebDriver, meetingUrl: string) {
  try {
    await driver.get(meetingUrl);
    await driver.sleep(1000);

    const popupBtn = await driver.wait(
      until.elementLocated(By.xpath("//span[contains(text(),'Got it')]")),
      10000
    );

    await popupBtn.click();

    const nameInput = await driver.wait(
      until.elementLocated(By.xpath("//input[@placeholder='Your name']")),
      10000
    );

    console.log("Joining the meeting...");

    await nameInput.clear();
    await nameInput.click();
    await nameInput.sendKeys("bot");
    await driver.sleep(1000);
    const btnInput = driver.wait(
      until.elementLocated(
        By.xpath(
          "//span[contains(text(), 'Join') or contains(text(), 'Ask to join')]"
        )
      ),
      10000
    );
    btnInput.click();

    return {
      data: "Successfully joined the meeting.",
      success: true,
    };
  } catch (error) {
    return {
      data: error,
      success: false,
    };
  }
}
