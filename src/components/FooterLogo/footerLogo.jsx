import logTelSrc from './footerLogoTel.svg';
import logWhatSrc from './footerLogoWA.svg';
import './footerLogo.css';

export const FooterLogo = () => {
    return (
        <a href='/'>
            <img src={logTelSrc} alt='лого телеграм' className='logoSocial'/>
        </a>,

        <a href='/'>
        <img src={logWhatSrc} alt='лого вотсапп' className='logoSocial'/>
        </a>

    )
     
    
}