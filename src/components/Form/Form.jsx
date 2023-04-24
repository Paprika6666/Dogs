import { useState } from "react";
import './index.css'

export const Form = ({submitForm, title, children}) =>{
    

    return (
    <>
      
        <form onSubmit={submitForm} className="form">
          <h1 className="form__title">{title}</h1>
          {children}
        </form>
  
    </>
    );
};

 