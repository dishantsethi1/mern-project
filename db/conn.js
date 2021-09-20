const mongoose = require("mongoose");

const Connection = async () => {
  const DB = process.env.DATABASE;
  try {
    await mongoose.connect(DB, {
      useNewUrlParser: true,
    });
    console.log("connection done");
  } catch (err) {
    console.log(err);
  }
};

// export default Connection;
module.exports = Connection;
