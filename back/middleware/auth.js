const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
  try {
      const token = req.headers.authorization.split(" ")[1];
      console.log(token);
      const decodedToken = jwt.verify(token, "SecretToken")
      console.log(decodedToken);
      const userId = decodedToken.userId
      console.log(decodedToken);
      if (req.body.userId && req.body.userId !== userId) {
          throw "Utilisateur non-reconnu !"
      } else {
          next()
      }
  } 
  catch (error) {
      res.status(400).json({ error: error || "Requête non authentifiée !" })
  }
};
