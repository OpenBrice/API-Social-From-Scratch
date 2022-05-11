const posts = require('../models/post');
const users = require('../models/user');

exports.updateLikesPost = (req, res) => {
    const id = req.params.id;
    const likes = req.body.like;
    const userId = req.body.userId;
    posts.update(likes, { where: { id: id, userId: userId }})
        .then(() => res.status(200).json({ message: 'Post liké avec succès' }))
        .catch(error => res.status(400).json({ message: 'Impossible de modifier ce post', error }));
};