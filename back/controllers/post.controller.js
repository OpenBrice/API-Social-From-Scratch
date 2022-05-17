const posts = require('../models/post');
const users = require('../models/user');

const multer = require ('multer');

// Create and Save a new post
exports.createPost = (req, res, next) => {
    const createInfos =  {
      description: req.body.description,
      userId: req.body.userId,
    };
    console.log(createInfos);
    if (req.file) {
      createInfos.image = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
    }
    if (req.file) {
      console.log("TRUE");
    } else {
      console.log("FALSE");
    };
    console.log(createInfos.image)
    posts.create(createInfos)
        .then((data) => {
            res.status(200).json({message: "le post a bien été crée !"});
        })
        .catch((error) => res.status(500).json({ message: "erreur server"}))
};




exports.getOnePost = (req, res, next) => {
    const id = req.params.id;
    posts.findOne({ where: { 
      id: req.params.id 
      },
        include: {
            model: users,
            required: true
        }, 
      })
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => res.status(500).json({ error: "impossible de récupérer le post" }))
};
// Find a single post with an id


exports.getAllposts = (req, res, next) => {
    posts.findAll({
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: users,
        },
      ],
    })
    .then(posts => res.status(200).json(posts))
    .catch(err => res.status(500).json(err))
};

// Update a post by the id in the request
exports.modifyPost = (req, res) => {
  const id = req.params.id;
  const userId = req.body.userId
  const updatedPost =  {
    description: req.body.description,
    userId: req.body.userId,
  };
  console.log(updatedPost);
  if (req.file) {
    updatedPost.image = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
  }
  if (req.file) {
    console.log("TRUE");
  } else {
    console.log("FALSE");
  };
  posts.update(updatedPost, { where: { id: id}})
        .then(() => res.status(200).json({ message: 'Post modifié avec succès' }))
        .catch(error => res.status(400).json({ message: 'Impossible de modifier ce post', error }));
}

exports.deletePost = (req, res, next) => {
  posts.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => res.status(200).json({ message: "post deleted !" }))
    .catch((err) => res.status(404).json({ err }));
};
