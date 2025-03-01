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

// Send emails every day at 8 AM
cron.schedule("0 8 * * *", async () => {
    const presentations = getUnnotifiedPresentations();
    if (presentations.length === 0) {
        console.log("No new presentations to notify.");
    }
    else {
        const response = await sendEmail(presentations)
        console.log(response);
    }
    console.log("Sent email notification.");

});

console.log("Thesis Tracker running...");


// to run localy without sending email
// initDatabase();
// let presentations = await getPresentations();
// console.log(presentations);





