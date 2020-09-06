const express = require('express')
const app = express();
const db = require('../Database-SQL');


app.get('/createshowstable', (req, res) => {
    let sql = `CREATE TABLE shows(id int AUTO_INCREMENT, email VARCHAR(255), showId VARCHAR(255),
     PRIMARY KEY(id))`;
    db.db.query(sql, (err, result) => {
        if (err) {
            throw err
        }
        console.log(result)
        res.send('Shows table created')
    })
})