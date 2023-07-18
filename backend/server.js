const app = require("./app");

// DB
const { connectDB } = require("./db/connect");

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
