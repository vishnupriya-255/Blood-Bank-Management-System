const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "vishnu25",
    database: "blood_bank"
});

db.connect((err) => {
    if (err) {
        console.log("Database connection failed");
        console.log(err);
    } else {
        console.log("MySQL database connected!");
    }
});

module.exports = db;