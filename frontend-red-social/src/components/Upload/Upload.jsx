import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import ButtonPrimary from "../buttons/ButtonPrimary";
import { useFetch } from "../../customHook/useFetch";

import "./Upload.css"

export default function Upload({ userId }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
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
      .post(`http://localhost:3001/api/post/save/${userId}`, formData, {
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
       console.log(error.response.data.message)
       setMessage(error.response.data.message)
       setError(error.response.data.status)
      });
    console.log(data);
  };

  

  return (
    <form className={"form__publi"} onSubmit={handleSubmit(onSubmit)}>
      <div className={"form__publi--continer--description"}>
        <label>Descripcion:</label>
        <input
          {...register("texto", { required: "Este campo es obligatorio" })}
          onChange={handleTextChange}
        />
        {errors.texto?.type === "required" && (<span>{errors.texto.message}</span>)}
      </div>
      <div className={"form__publi--continer--description"}>
        <label>Imagen:</label>
        <input
          type="file"
          {...register("imagen", { required: "Debes selecionar una imagen" })}
          onChange={handleFileChange}
        />
        {errors.imagen?.type === "required" && (<span>{errors.imagen.message}</span> )}
      </div>
      <ButtonPrimary text={"Enviar"} />
      {message != null && (<span>{message}</span>)}
    </form>
  );
}
