const users = require('../models/user');
const bcrypt = require('bcrypt');
const multer = require ('multer');

exports.getAllUsers = (req, res, next) =>{
    users.findAll()
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).json(err))
}
exports.getOneUser = (req, res, next) =>{
    const id = req.params.id;
    users.findByPk(id)
      .then((user) => {
        if (!user) {
          return res.status(404).json({
            message: "user not found",
          });
        }
        res.status(200).json({
          //admin: user.is_admin,
          profilePicture: user.profilePicture,
          userId: user.id,
          email: user.email,
          nom: user.nom,
          prenom: user.prenom,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt
        });
      })
      .catch((err) => res.status(500).json({ err }));
};

exports.updateUser = async (req, res, next) => {
  let password;
    if (req.body.password) {
      password = await bcrypt.hash(req.body.password, 10)
      .then((hash) => hash);
    }
    const user = {
      email: req.body.email,
      nom: req.body.nom,
      password,
      prenom: req.body.prenom,
      //profilePicture: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` //on modifie l'url de l'image car multer l'a crée et on vient recupérer l'url
    };
    console.log(user)
    if (req.file) {
      user.profilePicture = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
    }
    if (req.file) {
      console.log("TRUE");
    } else {
      console.log("FALSE");
    };
    users.update(user,  {
      where: { id: req.params.id },
    })
      .then((data) => {
        if (data[0] === 0) {
          return res.status(404).json({
            message: "user not found",
          });
        } else {
          res.status(200).json({ message: "user modified" });
        }
      })
      .catch((err) => res.status(500).json({ message: "erreur" }));
};

exports.deleteUser = (req, res, next) => {
  const id = req.params.id;
  users.findByPk(id)
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          message: "user not found",
        })
      } else{ // Sinon on supprime uniquement l'user
          users.destroy({ where: { id: req.params.id } });
          res.status(200).json({ message: "Compte supprimé !" });
        };
      })}