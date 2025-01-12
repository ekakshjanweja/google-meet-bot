import { WebDriver } from "selenium-webdriver";
import * as fs from "fs";
import * as path from "path";

export async function startScreenShare(driver: WebDriver) {
  console.log("Screen sharing started");

  const scriptContent = fs.readFileSync(
    path.join(__dirname, "recording-script.js"),
    "utf-8"
  );
  const response = await driver.executeScript(scriptContent);

  console.log(response);
  driver.sleep(10000);
}
