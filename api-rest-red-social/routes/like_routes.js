const express = require("express");
const router = express.Router();
const LikeController = require("../controllers/like_controller");
const { auth } = require("../middlewares/auth");

router.post("/save/", auth, LikeController.like);

module.exports = router;