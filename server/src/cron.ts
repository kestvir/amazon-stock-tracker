import cron from "node-cron";
import { updateDB } from "./scraper";

cron.schedule(`0,30 * * * *`, () => {
  console.log(`⏲️ RUNNING THE CRON`);
  updateDB();
});
