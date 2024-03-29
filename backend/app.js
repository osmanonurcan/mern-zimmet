require("dotenv").config();
const express = require("express");
const app = express();
const multer = require("multer");

// MULTER
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

const upload = multer({ storage: storage });

//ROUTERS
const deviceRouter = require("./routes/devices");

// MIDDLEWARES
const authenticationMiddleware = require("./middleware/authentication");
const errorHandlerMiddleware = require("./middleware/errorHandler");
const notFoundMiddleware = require("./middleware/notFound");

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());

// ROUTES
app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});
app.use("/devices", upload.single("image"), deviceRouter);

// ERROR HANDLER
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

module.exports = app;
