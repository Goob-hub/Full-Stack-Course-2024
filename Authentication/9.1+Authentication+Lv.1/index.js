import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import 'dotenv/config';

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

async function createUser(email, password) {
  try {
    const response = await db.query("INSERT INTO users (email, password) VALUES ($1, $2)", [email, password]);
  } catch (error) {
    console.error(error);
  }
}

async function verifyUser(email, password) {
  const response = await db.query(`SELECT * FROM users WHERE email = $1 AND password = $2`, [email, password]);
  const user = response.rows[0];
  
  if(user.email === email && user.password === password) {
    return true;
  } else {
    return false;
  }
}

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  try {
    const response = await db.query("SELECT * FROM users WHERE email = $1", [email]);

    if(response.rows.length > 0) {
      throw new Error("Email is already in use, try a different email!");
    } else {
      const response = await createUser(email, password);
      res.redirect("/");
    }

  } catch (error) {
    console.error(error);
    res.redirect("/register");
  }

});

app.post("/login", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  try {
    const response = await verifyUser(email, password);
    if(response) {
      res.render("secrets.ejs");
    } else {
      res.redirect("/login");
    }
  } catch (error) {
    console.error(error);
    res.redirect("/");
  }

});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
