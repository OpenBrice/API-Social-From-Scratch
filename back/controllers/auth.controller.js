const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const users = require('../models/user');

exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password,10)
  .then(hash => {
    users.create({
      email: req.body.email,
      password: hash,
      nom: req.body.nom,
      prenom: req.body.prenom
    })
    .then(() => res.status(200).json({ message: "Utilisateur créé !" }))
    .catch((error) => res.status(400).json({ error: "Utilisateur déjà présent dans la base de donnée" }));
  })
  .catch(error => res.status(500).json({ error }))
}

exports.login = (req, res, next) => {

  users.findOne({ where: { email: req.body.email} })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({
              message: "Echec de l'authentification",
            });
          }
          res.status(200).json({
            userId: user.id,
            admin: user.admin,
            token: jwt.sign({ userId: user.id }, "SecretToken", { expiresIn: "24h" }),
          });
        })
        .catch((err) => res.status(500).json({ err }));
    })
    .catch((err) => res.status(500).json({ err }));
};