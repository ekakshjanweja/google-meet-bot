import { Hono } from "hono";
import { spawnner } from "./spawnner";
import { getDriver } from "./utils";
import { startScreenShare } from "./start-screen-share";

const app = new Hono();

app.get("/", async (c) => {
  try {
    const driver = await getDriver();
    await spawnner(driver, "https://meet.google.com/vcc-jcoi-sut");
    await startScreenShare(driver);
  } catch (error) {
    c.json({
      data: error,
      success: false,
    });
  }
});

export default app;
