const express = require("express");
const mongoose = require("mongoose");
const postRoutes = require("./routes/posts");

const app = express();

mongoose
  .connect("mongodb+srv://cerbera:cerbera@cluster3.pybbuyi.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static("public"));
app.use("/api", postRoutes);

app.set("view engine", "ejs");

app.locals.formatDate = function (dateString) {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
};

app.get("/", (req, res) => {
  res.redirect("/api/posts");
});

const port = 3500;
app.listen(port, () => console.log(`Server is listening on port ${port}`));
