const express = require("express");
const router = express.Router();
const FollowController = require("../controllers/follow_controller");
const { auth } = require("../middlewares/auth");

//Definir rutas

router.get("/test-follow", FollowController.testFollow);
router.post("/save", auth , FollowController.follow);//Privado
router.delete("/unfollow/:id", auth , FollowController.unfollow);//Privado
router.get("/following/:id?/:page?", auth , FollowController.getFollowingUsers);//Privado
router.get("/followers/:id?/:page?", auth , FollowController.getFollowedUsers);//Privado
//Exportar rutas
module.exports = router;