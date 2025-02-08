import Database from "bun:sqlite";
import type { Presentation } from "./types";


const db = new Database("thesis.db", { create: true });



db.query(
  `
  CREATE TABLE IF NOT EXISTS presentations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    date TEXT,
    time TEXT,
    location TEXT,
    authors TEXT,
    opponents TEXT,
    level TEXT,
    notified INTEGER DEFAULT 0
  )
`
).run();
db.close();

export function savePresentations(presentations: Array<Presentation>) {
  const db = new Database("thesis.db");
  const insert = db.prepare(
    "INSERT INTO presentations (title, date, presenter) VALUES (?, ?, ?)"
  );

  for (const p of presentations) {
    const exists = db
      .query("SELECT id FROM presentations WHERE title = ? AND date = ?")
      .get(p.title, p.date);
    if (!exists) insert.run(p.title, p.date, p.time, p.location, p.authors, p.opponents, p.level);
  }
  db.close();
}

export function getUnnotifiedPresentations() {
  const db = new Database("thesis.db");
  const result = db
    .query("SELECT * FROM presentations WHERE notified = 0")
    .all();
  db.close();
  return result;
}

export function markAsNotified() {
  const db = new Database("thesis.db");
  const result = db
    .query("UPDATE presentations SET notified = 1 WHERE notified = 0")
    .run();
  db.close();
  return result;
}
