const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user_controller");
const { auth } = require("../middlewares/auth");
const multer = require("multer");

//Configurar multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,"./uploads/avatars")
    },
    filename: (req, file, cb) => {
        cb(null,"avatar-"+Date.now()+"-"+file.originalname);
    }
})

const upload = multer({storage: storage});

//Definir rutas
router.get("/test-user", auth, UserController.testUser);
router.post("/register", UserController.register);//Publico
router.post("/login", UserController.login);//Publico
router.get("/profile/:id", auth, UserController.getUser);//Privado
router.get("/list/:page?", auth, UserController.list);//Privado
router.put("/update", auth, UserController.update);//Privado
router.post("/upload-avatar",[auth, upload.single("file0")], UserController.upload);//Privado
router.get("/avatar/:fileName", UserController.avatar);//Publico
router.get("/counters/:id", auth, UserController.counters);//Privado
router.get('/users/:username',auth, UserController.getUserByUsername);

//Exportar rutas
module.exports = router;
