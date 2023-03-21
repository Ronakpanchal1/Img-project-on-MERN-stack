const mysql = require("mysql")

const db = mysql.createConnection({
    host: "localhost",
    user:"root",
    password:"hellosql",
    database:"img-uploading"
})

module.exports = db ;