import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { api } from "../../../Utils/api";
import { authApi } from '../../../Utils/authApi';
import { pattern } from '../../../Utils/validations';
import { BaseButton } from "../../BaseButton/BaseButton";
import { Form } from "../../Form/Form";
import "../style.css";


export const Login = ({ setShowModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onSubmit" });

  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate("/register");
  };

  
  const sendData = async (data) => {
    try {
      const res = await authApi.login(data);
      localStorage.setItem("token", res.token);
      navigate("/");
    } catch (error) {
      console.log();
      alert('Неправильные логин пароль');
    }
  };

  
  const emailRegister = register("email", {
    required: "Email обязателен",
    pattern: {
      message:
      "Недопустимый формат электронной почты",
      value: /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/,
    },
  });
  const passwordRegister = register("password", {
    required: "Пароль обязателен",
    pattern:pattern,
  });

  useEffect(() => {
    setShowModal(true);
  }, [setShowModal]);

  return (
    <>
      <Form submitForm={handleSubmit(sendData)} title={"Вход"}>
        <div className="auth__controls">
          <input
            type="text"
            {...emailRegister}
            placeholder="Email"
            className="auth__input"
          />
          {errors?.email && (
            <span className="auth__warning">{errors.email?.message}</span>
          )}
          <input
            type={"password"}
            {...passwordRegister}
            placeholder="password"
            className="auth__input"
          />
          {errors?.password && (
            <span className="auth__warning">{errors.password?.message}</span>
          )}
          <span className="auth__info auth__link" onClick={() => navigate('/reset-password')}>Восстановить пароль</span>

          <div className="auth__actions">
            <BaseButton type="submit" color={"yellow"}>
              <span>Войти</span>
            </BaseButton>
            <BaseButton onClick={handleClick} color={"white"}>
              <span>Регистрация</span>
            </BaseButton>
          </div>
        </div>
      </Form>
    </>
  );
};
