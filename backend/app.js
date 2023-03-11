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

// DB
const connectDB = require("./db/connect");

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
app.use("/devices", upload.single("image"), deviceRouter);

// ERROR HANDLER
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// START
const port = process.env.PORT || 5001;

const start = async () => {
  try {
    connectDB();
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
