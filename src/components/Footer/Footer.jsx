
import { Logo } from "../Logo/logo.jsx";

import './index.css';

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
            <p>© «Интернет-магазин DogFood.ru»</p>
          </div>
          
          <div className='footer__menu'>
            <p>Каталог</p>
            <p>Акции</p>
            <p>Новости</p>
            <p>Отзывы</p>                   
          </div>

          <div className='footer__services'>           
            <p>Оплата и доставка</p>
            <p>Часто спрашивают</p>
            <p>Обратная связь</p>                          
            <p>Контакты</p>
          </div>

          <div className="footer__contacts">
            <p>Мы на связи</p>
            <p>8 (999) 00-00-00</p>
            <p>dogfood.ru@gmail.com</p>
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

