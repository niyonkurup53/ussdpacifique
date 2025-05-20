// db.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./grades.db');

// Create tables
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id TEXT UNIQUE,
    name TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS grades (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id TEXT,
    subject TEXT,
    grade TEXT,
    FOREIGN KEY (student_id) REFERENCES students(student_id)
  )`);
});

module.exports = db;
