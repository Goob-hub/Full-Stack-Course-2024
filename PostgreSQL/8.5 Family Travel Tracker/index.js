import 'dotenv/config';
import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT),
});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentUserId = 1;

async function checkVisisted(userId) {
  const result = await db.query(`SELECT * FROM visited_countries WHERE user_id = ${currentUserId}`);
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}

async function getUsers() {
  const result = await db.query("SELECT * FROM users");
  let users = [];
  result.rows.forEach((user) => {
    users.push(user);
  });
  return users;
}

async function getCurUser() {
  const result = await db.query(`SELECT * FROM users WHERE id = ${currentUserId}`);
  let curUser = result.rows[0];
  return curUser;
}

app.get("/", async (req, res) => {
  const countries = await checkVisisted(currentUserId);
  const users = await getUsers();
  const curUser = await getCurUser();
  
  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    users: users,
    color: curUser.color,
  });
});

app.post("/add", async (req, res) => {
  const input = req.body["country"];

  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );

    const data = result.rows[0];
    const countryCode = data.country_code;
    try {
      await db.query(
        "INSERT INTO visited_countries (country_code, user_id) VALUES ($1, $2)",
        [countryCode, currentUserId]
      );
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/user", async (req, res) => {
  const input = req.body;
  const user = input.user;

  if(input.add) {
    res.render("new.ejs");
  } else {
    currentUserId = user;
    res.redirect("/")
  }
});

app.post("/new", async (req, res) => {
  //Hint: The RETURNING keyword can return the data that was inserted.
  //https://www.postgresql.org/docs/current/dml-returning.html
  const user = req.body;
  try {
    if(!user.name || !user.color) {
      throw new Error("Missing data for user, could not add to database!");
    }
    const result = db.query(`INSERT INTO users (color, name) VALUES ('${user.color}', '${user.name}')`);
    console.log(result);
  } catch (error) {
    console.error(error);
  }

  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
