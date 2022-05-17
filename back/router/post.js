const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/post.controller");
const likeCtrl = require ("../controllers/like.controller");
const multer = require("../middleware/multer-config");
const auth = require("../middleware/auth");

//Create and get posts
router.post("/", auth, multer, postCtrl.createPost);
router.get("/", auth, postCtrl.getAllposts);
router.get("/:id", auth, postCtrl.getOnePost);

//modify Post
router.get("/ModifyPost/:id", auth, postCtrl.getOnePost);
router.put("/ModifyPost/:id", auth, multer, postCtrl.modifyPost);
router.delete("/:id", auth, postCtrl.deletePost);



//router.post("/like/:id", likeCtrl.updateLikesPost)


module.exports = router;