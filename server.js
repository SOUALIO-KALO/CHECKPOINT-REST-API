const express = require("express");
const connectDb = require("./config/db_connection");
const User = require("./models/User");
require("dotenv").config();

const port = process.env.PORT || 3000;
const app = express();

// Middleware
app.use(express.json());

// Connexion à MongoDB
connectDb();

// GET : RETOURNER TOUS LES UTILISATEURS
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST : AJOUTER UN NOUVEAU UTILISATEUR À LA BASE DE DONNÉES
app.post("/user", async (req, res) => {
  try {
    const { fullname, age, email } = req.body;

    // Vérifier que tous les champs sont bien fournis
    if (!fullname || !age || !email) {
      return res.status(400).json({ error: "Tous les champs sont requis" });
    }

    const newUser = new User({ fullname, age, email });
    const saveUser = await newUser.save();
    res.status(200).json(saveUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT : ÉDITER UN UTILISATEUR PAR ID
app.put("/user/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedUser)
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE : SUPPRIMER UN UTILISATEUR PAR ID
app.delete("/user/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser)
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    res.status(200).json({ message: "Utilisateur supprimé avec succès" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`🚀 Serveur démarré sur localhost:${port}`);
});
