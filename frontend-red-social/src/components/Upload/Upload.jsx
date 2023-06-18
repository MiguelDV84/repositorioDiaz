import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import ButtonPrimary from "../buttons/ButtonPrimary";
import { useFetch } from "../../customHook/useFetch";
import FooterMenu from "./../menu/Menu";
import TextField from "@mui/material/TextField";
import Logo from "./../../assets/image/logo/logo-small.png";
import "./Upload.css";
import Header from "../utils/Header/Header";

export default function Upload() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [text, setText] = useState();
  const [file, setFile] = useState();
  const [image, setImage] = useState();
  const [message, setMessage] = useState();
  const [error, setError] = useState();
  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("text", text);
    formData.append("file", file);

    axios
      .post(`http://localhost:3001/api/post/save/${user.id}`, formData, {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response);
        setImage(response.data.publicationStored.file);
      })
      .catch((error) => {
        console.log(error);
        setMessage(error.response.data.message);
        setError(error.response.data.status);
      });
    console.log(data);
  };

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }, [file]);

  return (
    <>
      <Header text={`Subir publicacion`} back={true} />

      <form className={"form__publi"} onSubmit={handleSubmit(onSubmit)}>
        <div className="form__header">
          <h1>Code<br/>GRAM</h1>
        </div>
        <div className={"form__publi--continer--description"}>
          <input
            placeholder="Escribe una descripción..."
            {...register("texto", { required: "Este campo es obligatorio" })}
            onChange={handleTextChange}
          />
          {errors.texto?.type === "required" && (
            <span>{errors.texto.message}</span>
          )}
        </div>
        <div
          className={"form__publi--continer--file"}
          style={{
            height: "240px",
            width: "240px",
            backgroundColor: "lightblue",
          }}
        >
          <div
            className="file-button"
            onClick={() => document.getElementById("file-input").click()}
          >
            <span>Elige una Imagen</span>
            {image && <img src={image} alt="Vista previa de la imagen" />}
          </div>
          <input
            id="file-input"
            type="file"
            {...register("imagen", {
              required: "Debes seleccionar una imagen",
            })}
            onChange={handleFileChange}
          />
          {errors.imagen?.type === "required" && (
            <span>{errors.imagen.message}</span>
          )}
        </div>
        <ButtonPrimary text={"Enviar"} />
        {message != null && <span>{message}</span>}
        <FooterMenu />
      </form>
    </>
  );
}
