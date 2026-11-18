const express = require("express");
const app = express();
const path = require("path");

const userRoutes = require("./src/routes/userRoutes");

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/", userRoutes);

app.listen(7000, () => {
    console.log("Server running on 7000");
});

 
