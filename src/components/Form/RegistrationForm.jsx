import { useState } from "react";
import { useForm } from "react-hook-form";

import "./index.css";

// const handleSubmit = (onSubmit) => {
//     // smth -> data
//     onSubmit(data)
// }

export const RegistrationForm = ({ sendData}) => {
  const [type, setType] = useState(false);
  const {register, handleSubmit, formState: { errors }, } = useForm();

  const onSubmit = (data) => {
    // console.log({ data });
    sendData(data);
  };
  // const nameRegister = {
  //   required: {
  //     value: flag,
  //     message: "Это поле очень очень обязательное",
  //   },
  //   minLength: {
  //     value: 2,
  //     message: "Такое short имя нельзя",
  //   },
  // };

  // console.log({ errors });
  return (
    <>
      <div style={{ padding: "50px" }}>
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <h3>Registration</h3>
          <input
            type="text"
            {...register("name", {
              required: {
              value: true,
              message: "Это обязательное поле",
            },
            minLength: {
              value: 2,
              message: "Слишком короткое имя",
            },
          })}
            placeholder="Name"
            className="form__input"
          />
          {errors?.name && (
            <span className="ErrorText">{errors.name?.message}</span>
          )}
          <input
            type="text"
            {...register("email", {
              required: "email is required",
              pattern: {
                message:
                  "Недопустимый формат электронной почты",
                value: /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/,
              },
            })}
            placeholder="email"
            className="form__input"
          />
          {errors?.email && (
            <span className="ErrorText">{errors.email?.message}</span>
          )}

          <div className="form__eye-wrapper">
            <input
              type={type ? "text" : "password"}
              {...register("password", {
                required: "password is required",
                pattern: {
                  message:
                    "Пароль должен содержать минимум 8 символов, одну букву латинского алфавита и одну цифру",
                  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                },
              })}
              placeholder="password"
              className="form__input"
            />
            <span className="form__eye" onClick={() => setType(!type)}>
              {type ? "hide" : "show"}
            </span>
          </div>
          {errors?.password && (
            <span className="ErrorText">{errors.password?.message}</span>
          )}
          <button type="submit">Register</button>
        </form>
      </div>
    </>
  );
};
