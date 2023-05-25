const express = require("express");
const router = express.Router();
const LikeController = require("../controllers/like_controller");
const { auth } = require("../middlewares/auth");

router.post("/save/:userId", auth, LikeController.like);
router.delete("/dislike/", auth, LikeController.dislike);

module.exports = router;