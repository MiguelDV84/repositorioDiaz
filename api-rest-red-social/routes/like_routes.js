const express = require("express");
const router = express.Router();
const LikeController = require("../controllers/like_controller");
const { auth } = require("../middlewares/auth");

router.post("/save/:postId", auth, LikeController.like);
router.delete("/dislike/:postId", auth, LikeController.dislike);
router.get("/likes/:postid", auth, LikeController.countLikes);


module.exports = router;