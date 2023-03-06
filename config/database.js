const mongoose = require("mongoose");
function connect(uri) {
  mongoose.set("strictQuery", false);
  return mongoose.connect(uri);
}
module.exports = connect;
