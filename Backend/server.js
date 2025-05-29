const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectToDatabase = require("./config/db.js");
const LoginRoutes = require("./routes/login.route.js");
const RegisterRoutes = require("./routes/signup.route.js");
const BlogRoutes = require("./routes/blog.Route.js");
const path = require("path");
dotenv.config();
const app = express();

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (!process.env.PORT) {
  console.error("ERROR: PORT is not defined in the environment variables.");
  process.exit(1);
}


connectToDatabase()
  .then(() => console.log("Database connected successfully"))
  .catch((error) => {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  });


app.get("/", (req, res) => {
  res.send("The API is running");
});

app.use("/api/v1/", RegisterRoutes);
app.use("/api/v1/", LoginRoutes);
app.use("/api/v1/", BlogRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`);
});
