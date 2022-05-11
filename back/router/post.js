const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/post.controller");
const likeCtrl = require ("../controllers/like.controller");
const multer = require("../middleware/multer-config");

//Create and get posts
router.post("/", multer, postCtrl.createPost);
router.get("/", postCtrl.getAllposts);
router.get("/:id",  postCtrl.getOnePost);

//modify Post
router.get("/ModifyPost/:id",  postCtrl.getOnePost);
router.put("/ModifyPost/:id",  multer, postCtrl.modifyPost);
router.delete("/:id", postCtrl.deletePost);


router.post("/like/:id", likeCtrl.updateLikesPost)


module.exports = router;