const connect = require("./config/database");
const app = require("./app");
require("dotenv").config();
const start = async () => {
  try {
    await connect(process.env.MONGO_URI);
    console.log("connected to DB");
    app.listen(process.env.PORT, () => {
      console.log("server is working on http://localhost" + process.env.PORT);
    });
  } catch (error) {
    console.log(error.message);
  }
};
start();
