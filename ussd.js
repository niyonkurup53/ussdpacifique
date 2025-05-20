// ussd.js
const db = require('./db');

function handleUssd(req, res) {
  let { text, phoneNumber, sessionId } = req.body;

  const inputs = text.split("*");
  const level = inputs.length;

  if (text === "") {
    res.send("CON Welcome to Grade Checker\n1. Register\n2. Check Grades");
  } else if (text === "1") {
    res.send("CON Enter Student ID to register:");
  } else if (level === 2 && inputs[0] === "1") {
    let studentId = inputs[1];
    db.run(`INSERT OR IGNORE INTO students (student_id, name) VALUES (?, ?)`, [studentId, "Anonymous"], (err) => {
      if (err) return res.send("END Error registering.");
      res.send("END Registered successfully.");
    });
  } else if (text === "2") {
    res.send("CON Enter your Student ID:");
  } else if (level === 2 && inputs[0] === "2") {
    let studentId = inputs[1];
    db.all(`SELECT subject, grade FROM grades WHERE student_id = ?`, [studentId], (err, rows) => {
      if (err || rows.length === 0) return res.send("END No grades found.");
      let response = "END Grades:\n";
      rows.forEach(row => {
        response += `${row.subject}: ${row.grade}\n`;
      });
      res.send(response);
    });
  } else {
    res.send("END Invalid input");
  }
}

module.exports = handleUssd;
