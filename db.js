const Mongoose = require("mongoose");

const localDB = `mongodb+srv://rajsahilcoder:sahil@cluster0.paaxgf1.mongodb.net/role_auth?retryWrites=true&w=majority`;

const connectDB = async () => {
  await Mongoose.connect(localDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log("MongoDB Connected");
};

module.exports = connectDB;