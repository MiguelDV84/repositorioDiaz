const express = require("express");
const router = express.Router();
const PublicationController = require("../controllers/publication_controller");
const { auth } = require("../middlewares/auth");
const multer = require("multer");


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,"./uploads/publications")
    },
    filename: (req, file, cb) => {
        cb(null,"pub-"+Date.now()+"-"+file.originalname);
    }
})

const uploads = multer({storage: storage});



//Definir rutas

router.get("/test-publication", PublicationController.testPubli);
router.post("/save", [auth, uploads.single("file")], PublicationController.save); // Privado
router.get("/detail/:id", auth, PublicationController.getPubli);//Privado
router.delete("/delete/:id", auth, PublicationController.remove);//Privado
router.get("/user/:id/:page?",auth, PublicationController.getPublicationsUser);//Privado
router.get("/media/:fileName", PublicationController.media)//Publico
router.get("/feed/:page?",auth, PublicationController.feed);//Privado

//Exportar rutas
module.exports = router;