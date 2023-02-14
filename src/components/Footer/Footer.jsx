import { FooterLogo } from "../FooterLogo/footerLogo.jsx";
import { Logo } from "../Logo/logo.jsx";

import './index.css';

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
            <p>Оплата и доставка</p>
            <p>Акции</p>
            <p>Часто спрашивают</p>
            <p>Новости</p>
            <p>Обратная связь</p>
            <p>Отзывы</p>                   
            <p>Контакты</p>
          </div>

          <div className="footer__contacts">
                <p>Мы на связи</p>
                <p>8 (999) 00-00-00</p>
                <p>dogfood.ru@gmail.com</p>
                <p className="footer__logo">
                  <FooterLogo />
                  
                </p>
          </div>
            
        </div>
      </div>
    </div>
   );
};

