import cron from "cron";
import https from "https";

const URL = "https://expense-tracker-app-vxf8.onrender.com/";

const job = new cron.CronJob("*/14 * * * *", () => {
  https
    .get(URL, (res) => {
      if (res.statusCode === 200) {
        console.log("Resquest sent successfully");
      } else {
        console.log("Request failed");
      }
    })
    .on("error", (e) => {
      console.log("Error while sending request ", e);
    });
});

export default job;
