import 'dotenv/config';
import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT),
});

db.connect();

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let visitedCountries = [];

let data = {
  total: 0,
  countries: visitedCountries
}

db.query("SELECT * FROM visited_countries", (err, res) => {
  if(err) {
    console.error(err.stack);
  } else {
    res.rows.forEach(row => {
      visitedCountries.push(row.country_code);
      data.total++;
    });
  }
});


app.get("/", async (req, res) => {
  console.log(visitedCountries);
  res.render("index.ejs", data);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
