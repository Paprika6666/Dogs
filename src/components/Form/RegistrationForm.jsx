import { useState } from "react";
import { useForm } from "react-hook-form";

// import ".index.scss"


export const RegistrationForm = () => {
    const {register, handleSubmit } = useForm ();

    const onSubmit = (data) => {
        console.log ({ data});
    };

    return (

        <div style={{ padding: "50px" }}>
            <form onSubmit = {handleSubmit (onSubmit)} className = "form">
                
            </form>
        </div>

    )
}