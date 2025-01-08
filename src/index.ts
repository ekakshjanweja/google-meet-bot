import { Hono } from "hono";
import { main } from "./spawnner";

const app = new Hono();

app.get("/", async (c) => {
  return await main();
});

export default app;
