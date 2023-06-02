//Importar dependencias
const express = require("express");
const cors = require("cors");
const { connection } = require("./database/connection");

//Mensaje de inicio
console.log("API NODE para Red Social lanzada");

//Conexion a bbdd
console.log("conectando a la base de datos...");
connection();

//Crear servidor node
const app = express();
const PORT = 3001;

//Configurar cors
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

//Convertir los datos del body a objetos json
app.use(express.json());
//Cualquier dato que llegue por la url lo convierte en un objeto json
app.use(express.urlencoded({ extended: true }));

//Cargar conf ruta
const userRoutes = require("./routes/user_routes");
const followRoutes = require("./routes/follow_routes");
const publicationRoutes = require("./routes/publication_routes");
const likeRoutes = require("./routes/like_routes");

app.use("/api/user/", userRoutes);
app.use("/api/follow/", followRoutes);
app.use("/api/post/", publicationRoutes);
app.use("/api/like/", likeRoutes);


//Lanzar servidor a escuchar peticiones http
app.listen(PORT, (err) => {
  if (err) {
    console.log("Error al iniciar el servidor");
  } else {
    console.log("Servidor escuchando en el puerto: " + PORT);
  }
});
