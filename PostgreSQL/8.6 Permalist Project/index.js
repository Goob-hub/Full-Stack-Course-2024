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

async function getItems() {
  const result = await db.query("SELECT * FROM items ORDER BY id ASC");
  return result.rows;
}

app.get("/", async (req, res) => {
  let items = await getItems();
  console.log(items);
  res.render("index.ejs", {
    listTitle: "Today",
    listItems: items,
  });
});

app.post("/add", async (req, res) => {
  const item = req.body.newItem;

  try {
    if(!item) {
      throw new Error("Missing data to input into database!");
    }
    const result = await db.query("INSERT INTO ITEMS (title) VALUES($1)", [item]);
  } catch (error) {
    console.error(error);
  }
  
  res.redirect("/");
});

app.post("/edit", async (req, res) => {
  const item_id = parseInt(req.body.updatedItemId);
  const item_title = req.body.updatedItemTitle;
  
  try {
    if(!item_id || !item_title) {
      throw new Error("Missing data to update item on to-do list");
    }
    const result = await db.query(`UPDATE items SET title = $1 WHERE id = $2;`, [item_title, item_id]);
  } catch (error) {
    console.error(error)
  }

  res.redirect("/");
});

app.post("/delete", (req, res) => {
  const item_id = req.body.deleteItemId;
  console.log(item_id);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
