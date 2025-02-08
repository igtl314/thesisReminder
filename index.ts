import { getPresentations } from "./fetchThesis.js";
import { savePresentations, getUnnotifiedPresentations, initDatabase } from "./database.js";
import { sendEmail } from "./sendEmail.js";
import cron from "node-cron";

//Fetch and store presentations every hour
initDatabase();
cron.schedule("0 * * * *", async () => {
    const presentations = await getPresentations();
    savePresentations(presentations);
    console.log("Updated presentations.");
});

// Send emails every two days at 8 AM
cron.schedule("0 8 */2 * *", async () => {
    const presentations = getUnnotifiedPresentations();
    await sendEmail(presentations);
    console.log("Sent email notification.");

});

console.log("Thesis Tracker running...");

