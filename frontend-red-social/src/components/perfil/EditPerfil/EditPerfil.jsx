import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./EditPerfil.css";
import ButtonPrimary from "../../buttons/ButtonPrimary";
import Header from "../../utils/Header/Header";
import FooterMenu from "../../menu/Menu";

export default function EditPerfil() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [previewImage, setPreviewImage] = useState(null);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    axios
      .put("http://localhost:3001/api/user/update", data, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        console.log(response);
        setMessage(response?.data.message);
        setStatus(response?.data.status);
        setTimeout(() => {
          navigate(-1); // Redirigir al perfil después de 2 segundos
        }, 2000);
      })
      .catch((error) => {
        console.error(error.response);
        setMessage(error?.response.data.message);
        setStatus(error?.response.data.status);
      });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setPreviewImage(null);
    }
  };

  return (
    <>
    <Header text={"Editar Perfil"} back={true} />
    <form className="update-profile-form" onSubmit={handleSubmit(onSubmit)}>
      <h1>Actualizar Perfil</h1>
      <div className="update-profile-input-container">
        <input
          type="text"
          placeholder="Nuevo nombre"
          {...register("name")}
        />
      </div>
      <div className="update-profile-input-container">
        <input
          type="text"
          placeholder="Nuevo nick"
          {...register("nick")}
        />
      </div>
      <div className="update-profile-input-container">
        <input
          type="password"
          placeholder="Nueva contraseña"
          {...register("password")}
        />
      </div>
     
      <ButtonPrimary text="Actualizar" />
      {status && <span>{message}</span>}
    </form>
    <FooterMenu/>
    </>
  );
}
