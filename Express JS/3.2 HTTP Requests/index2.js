import express from "express"

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
    res.send("<h1> Yo wus gud bby mama! </h1>");
});

app.get("/about", (req, res) => {
    res.send("<h1> I SAID WUS GOOD BABY MAMMA </h1>");
});

app.get("/contact", (req, res) => {
    res.send("<h1> I'GHT IM CUMMING FOR YOU MOTHER FUCKER! </h1>");
});

app.listen(PORT, () => {
    console.log(`Server up and running on port ${PORT}`)
});