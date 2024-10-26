import express from "express";

const app = express();
const port = 3000;

let day = new Date().getDay();

app.listen(port, (req, res) => {
    console.log(`server live on port:${port}`);
});

app.get("/", (req, res) => {
    if(day === 6 || day === 0) {
        res.render("index.ejs", { isWeekend: true });
    } else {
        res.render("index.ejs", { isWeekend: false });
    }
});
