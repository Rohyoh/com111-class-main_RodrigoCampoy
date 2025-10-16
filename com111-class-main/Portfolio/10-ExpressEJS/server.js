const { render } = require("ejs");
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.engine("ejs", require("ejs").renderFile);
app.set("view engine", "ejs");

const longContent =
    "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";

var posts = [];
var name;

var forums = [];

app.route("/").get((req, res) => {
    res.render("home");
});

app.post("/login", (req, res) => {
    const username = req.body.username;
    res.render("welcome", { username });
});

app.post("/add_blog", (req, res) => {

    title = req.body.title;
    description = req.body.description;

    console.log(title, description);
    forums.push({'title': title, 'description': description});
    res.render("blogs", {forums});
});

app.listen(3000, (err) => {
    console.log("Listening on port 3000");
});
