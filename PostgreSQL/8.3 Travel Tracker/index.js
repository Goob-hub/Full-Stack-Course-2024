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

let data = {};
let err;

app.get("/", async (req, res) => {
  data = {
    total: 0,
    countries: [],
    error: err
  };

  try { 
    let response = await db.query("SELECT * FROM visited_countries");
    let dbData = response.rows;
    dbData.forEach(country => {
      data.countries.push(country.country_code);
      data.total++;
    });
  } catch (error) {
    data.error = "Problem with getting visited countries!"
    console.error(error.message);
  }

  res.render("index.ejs", data);
  
});

app.post("/add", async (req, res) => {
  let countryName = req.body.country;
  let isDuplicateCountry = false;
  err = null;

  try { 
    if(!countryName) {
      throw new Error("No input data provided");
    }

    let capitalizedInput = countryName.charAt(0).toUpperCase() + countryName.slice(1).toLowerCase();
    let response = await db.query(`SELECT * FROM countries WHERE country_name LIKE '%' || '${capitalizedInput}' || '%'`);
    let dbData = response.rows[0];

    data.countries.forEach(countryCode => {
      if(countryCode === dbData.country_code) {
        isDuplicateCountry = true;
      }
    });

    if(dbData && !isDuplicateCountry) {
      await db.query(`INSERT INTO visited_countries(country_code) VALUES('${dbData.country_code}')`);
    }

  } catch (error) {
    err = "Country does not exist, try again!";
    console.error(error.message);
  }

  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
