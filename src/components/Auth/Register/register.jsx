import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { authApi } from '../../../Utils/authApi';
import { BaseButton } from "../../BaseButton/BaseButton";
import { Form } from "../../Form/Form";
import { pattern } from "../../../Utils/validations.js";
import {ReactComponent as EyeClose} from '../../Auth/eyeClose.svg'
import {ReactComponent as EyeOpen} from '../../Auth/eyeOpen.svg'
import { useState } from "react";



export const Register = ({ setShowModal }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ mode: "onSubmit" });
    const navigate = useNavigate();
    const [type, setType] = useState(false);

    const handleClick = (e) => {
        e.preventDefault();
        console.log(e);
        navigate("/login");
    };

    const sendData = async (data) => {
        
        try {
            await authApi.registerUser({ ...data, group: "group-10" });
            navigate("/login");
        } catch (error) {
            alert(error);
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
        pattern: pattern,
    });

    useEffect(() => {
        setShowModal(true);
    }, [setShowModal]);


    return (
        <>
            <Form submitForm={handleSubmit(sendData)} title={"Регистрация"}>
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
                     {/* <span className="form__eye" onClick={() => setType(!type)}>
                       {type ? <EyeClose/> : <EyeOpen/>}
                     </span> */}
                    {errors?.password && (
                        <span className="auth__warning">{errors.password?.message}</span>
                    )}
                    <span className="auth__info">
                        Регистрируясь на сайте, вы соглашаетесь с нашими Правилами и
                        Политикой конфиденциальности и соглашаетесь на информационную
                        рассылку.
                    </span>

                    <div className="auth__actions">
                        <BaseButton type="submit" color={"yellow"}>
                            <span>Зарегистрироваться</span>
                        </BaseButton>
                        <BaseButton onClick={handleClick} color={"white"}>
                            <span>Войти</span>
                        </BaseButton>
                    </div>
                </div>
            </Form>
        </>
    );
};
