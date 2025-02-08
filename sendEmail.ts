
import type { Presentation } from "./types";
const mailjet = require("node-mailjet").connect(
    process.env.API_KEY,
    process.env.SECRET_KEY
);


export async function sendEmail(thesisList: Array<Presentation>) {
    const recipientEmail = "marcus.doberl@gmail.com"; // Change to your email
    const subject = "Upcoming Thesis Presentations";

    // Format thesis presentations as an HTML list
    const thesisHtml = thesisList.map(thesis => `
    <li>
      <b>${thesis.date} kl ${thesis.time} - ${thesis.title}</b><br>
      Location: ${thesis.location}<br>
      Authors: ${thesis.authors}<br>
      Opponents: ${thesis.opponents}<br>
      Level: ${thesis.level}
    </li>
  `).join("");

    const htmlContent = `
    <h3>Upcoming Thesis Presentations</h3>
    <ul>${thesisHtml}</ul>
    <p>Check the university website for more details.</p>
  `;

    try {
        const request = mailjet.post("send", { version: "v3.1" }).request({
            Messages: [
                {
                    From: {
                        Email: "thesispresenations@mardo.dev",
                        Name: "Thesis Notifier",
                    },
                    To: [
                        {
                            Email: recipientEmail,
                            Name: "User",
                        },
                    ],
                    Subject: subject,
                    TextPart: "You have new upcoming thesis presentations.",
                    HTMLPart: htmlContent,
                },
            ],
        });

        const result = await request;
        console.log("Email sent successfully:", result.body);
    } catch (err) {
        console.error("Error sending email:", err.statusCode, err.message);
    }
}
