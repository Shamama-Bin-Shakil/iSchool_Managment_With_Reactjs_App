const express = require("express");
const connectDB = require("./server/DB/db");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cloudinary = require("cloudinary");
const path = require("path");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;
// Apply Middleware
app.use(express.json({ limit: "25mb" }));
app.use(bodyParser.urlencoded({ limit: "25mb", extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

// Router
app.use("/api/v1", require("./server/Router/authRouter"));
app.use("/api/v1", require("./server/Router/adminRouter"));
app.use("/api/v1", require("./server/Router/feesRouter"));
app.use("/api/v1", require("./server/Router/examPaperRouter"));
app.use("/api/v1", require("./server/Router/featureRouter"));
app.use("/api/v1", require("./server/Router/visitorRouter"));
app.use("/api/v1", require("./server/Router/contactRouter"));

// Database Connection
connectDB();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

app.use(express.static(path.join(__dirname, "./frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./frontend/build/index.html"));
});

app.listen(port, () =>
  console.log("> SERVER IS RUNNING --> http://localhost:" + port)
);
