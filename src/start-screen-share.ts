import { WebDriver } from "selenium-webdriver";
import * as fs from "fs";
import * as path from "path";

export async function startScreenShare(driver: WebDriver) {
  const scriptContent = fs.readFileSync(
    path.join(__dirname, "recording-script.js"),
    "utf-8"
  );
  const response = await driver.executeScript(scriptContent);

  driver.sleep(10000);
}
