const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
  try {
      const token = req.headers.authorization.split(" ")[1];
      console.log(token);
      const decodedToken = jwt.verify(token, "SecretToken")
      console.log(decodedToken);
      const userId = decodedToken.userId
      if (req.body.userId && req.body.userId !== userId) {
        res.redirect('/login'); 
      } else {
          next()
      }
  } 
  catch (error) {
    res.redirect('/login'); 
      res.status(400).json({ error: "requête non authentifiée" || "Requête non authentifiée !" })
  }
};
