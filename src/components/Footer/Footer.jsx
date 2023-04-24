
import { Logo } from "../Logo/logo.jsx";
import { useContext } from "react";
import { UserContext } from "../context/userContext.js";
import './index.css';
import { Link } from "react-router-dom";

import { ReactComponent as LogoTg } from './Icons/LogoTg.svg'
import { ReactComponent as LogoWa } from './Icons/LogoWa.svg'
import { ReactComponent as LogoVb } from './Icons/LogoVb.svg'
import { ReactComponent as LogoIg } from './Icons/LogoIg.svg'
import { ReactComponent as LogoVk } from './Icons/LogoVk.svg'

export const Footer = () => {
    return (
  <div className='footer'>
    <div className='container'>
      <div className='footer__wrapper'>
         <div className="footer__left">
            <Logo/>
            <p className="companyFooter">© «Интернет-магазин TheChair.ru»</p>
          </div>
          
          <div className='footer__menu'>
          <nav className="menu-bottom">         
            <a href="/" className="menu-bottom__item">Каталог</a>
            <a href={"/"} className="menu-bottom__item">Акции</a>
            <a href="/" className="menu-bottom__item">Новости</a>                          
            <a href="/" className="menu-bottom__item">Отзывы</a>
            </nav>
                               
          </div>

          <div className='footer__services'>  
          <nav className="menu-bottom">         
            <a href="/" className="menu-bottom__item">Оплата и доставка</a>
            <Link to={"/faq"} className="menu-bottom__item">Часто спрашивают</Link>
            <a href="/" className="menu-bottom__item">Обратная связь</a>                          
            <a href="/" className="menu-bottom__item">Контакты</a>
            </nav>
          </div>

          <div className="footer__contacts">
          <nav className="menu-bottom">         
            <a href="/" className="menu-bottom__item">Мы на связи</a>
            <a href={"/"} className="menu-bottom__item">8 (999) 00-00-00</a>
            <a href="/" className="menu-bottom__item">TheChair.ru@gmail.com</a>                          
          </nav>
           
            <div className="footer__socials">
            <LogoTg /> 
            <LogoWa /> 
            <LogoVb /> 
            <LogoIg /> 
            <LogoVk />  
            </div>
         </div> 
        
       </div>
      </div>
    </div>
   );
};

