const express = require("express");
const app = express();
const path = require("path");

require("dotenv").config();

const userRoutes = require("./src/routes/userRoutes");
const connectDB = require("./src/config/db")

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", userRoutes);

connectDB()
app.listen(process.env.PORT, () => {
    console.log(`Server running on ${process.env.PORT}`);
});

 
