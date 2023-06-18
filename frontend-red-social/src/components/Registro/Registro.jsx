import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ButtonPrimary from "../buttons/ButtonPrimary";
import Logo from "./../../assets/image/logo/logo-small.png";

import "./Registro.css";

export default function Registro() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = (data) => {
    axios
      .post("http://localhost:3001/api/user/register", data, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        console.log(response.data);
        setMessage(response?.data.message);
        setStatus(response?.data.status);
        if (response?.data.status === "success") {
          setTimeout(() => {
            navigate("/");
          }, 3000);
        }
      })
      .catch((error) => {
        console.error(error.response.data);
        setMessage(error?.response.data.message);
        setStatus(error?.response.data.status);
      });
  };

  return (
    <form className="register__form" onSubmit={handleSubmit(onSubmit)}>
      <div className="register__header">
        <img src={Logo} alt="Logo" />
        <h1>Registro</h1>
      </div>
      <input
        className="register__input"
        type="text"
        placeholder="nombre"
        {...register("name", { required: "El campo nombre es obligatorio" })}
      />
      {errors.name?.type === "required" && <span>{errors.name.message}</span>}

      <input
        className="register__input"
        type="text"
        placeholder="surname"
        {...register("surname", {
          required: "El campo apellido es obligatorio",
        })}
      />
      {errors.surname?.type === "required" && (
        <span>{errors.surname.message}</span>
      )}

      <input
        className="register__input"
        type="text"
        placeholder="nick"
        {...register("nick", { required: "El campo nick es obligatorio" })}
      />
      {errors.nick?.type === "required" && <span>{errors.nick.message}</span>}

      <input
        className="register__input"
        type="email"
        placeholder="Email"
        {...register("email", {
          required: "El campo email es obligatorio",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Ingrese un email válido",
          },
        })}
      />
      {errors.email?.type === "required" && <span>{errors.email.message}</span>}
      {errors.email?.type === "pattern" && <span>{errors.email.message}</span>}

      <input
        className="register__input"
        type="password"
        placeholder="password"
        {...register("password", { required: "Este campo es obligatorio" })}
      />
      {errors.password?.type === "required" && (
        <span>{errors.password.message}</span>
      )}

      <ButtonPrimary text="Registrar" />

      {status && <span>{message}</span>}
    </form>
  );
}
