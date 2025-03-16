const mongoose = require("mongoose");
require("dotenv").config();

const uri = process.env.MONGO_URI;
const option = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connetionToDb = async () => {
  try {
    await mongoose.connect(uri, option);
    console.log("✅ Connexion réussie à mongoDB");
  } catch (error) {
    console.log("❌ Erreur de connexion à mongoDB : ", error.message);
    process.exit(1);
  }
};

module.exports = connetionToDb;
