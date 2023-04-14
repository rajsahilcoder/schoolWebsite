const Mongoose = require("mongoose");

const localDB = `mongodb+srv://rajsahil:rajsahil@cluster0.aurr6hq.mongodb.net/role_auth?retryWrites=true&w=majority`;

const connectDB = async () => {
  await Mongoose.connect(localDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log("MongoDB Connected");
};

module.exports = connectDB;