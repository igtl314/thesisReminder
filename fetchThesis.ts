import { fetch } from "bun";
import * as cheerio from "cheerio";
import type { Presentation } from "./types";

const URL = "https://www.ida.liu.se/wexupp/public_presentations?layout=2";  // Replace with actual URL

export async function getPresentations() {
    const res = await fetch(URL);
    const arrayBuffer = await res.arrayBuffer();
    const html = new TextDecoder("iso-8859-1").decode(arrayBuffer);
    const $ = cheerio.load(html);



    let presentations: Array<Presentation> = [];

    $("ul li").each((i, el) => {
        const text = $(el).text().trim().split("\n").map(line => line.trim());
        console.log(text);
        const dateLocation = text[0].split("kl");  // Splitting date and time from location
        const date = dateLocation[0].trim();
        const timeLocation = dateLocation[1]?.trim().split(" i ") || "";
        const time = timeLocation[0]?.trim() || "";
        const location = timeLocation[1]?.trim() || "";
        const title = $(el).find("i b").text().trim();
        const authorLine = text.find(line => line.startsWith("Författare:")) || "";
        const authors = authorLine.replace("Författare:", "").trim();
        const opponentIndex = text.findIndex(line => line.includes("Opponent"));

        const opponents = opponentIndex !== -1 ? text[opponentIndex + 1] || "" : "";
        const level = text.find(line => line.startsWith("Nivå:"))?.replace("Nivå:", "").trim() || "";

        const presentation: Presentation = { date, time, location, title, authors, opponents, level };

        presentations.push(presentation);
    });

    return presentations;
}
