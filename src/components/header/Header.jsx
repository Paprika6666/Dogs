import { Logo } from '../Logo/logo';
import { Search } from '../Search/Search';

import './style.css';



export const Header = ({setSearchQuery}) => {
    return (
    <div className='header'>
        <div className='container'>
            <div className='header__wrapper'>
            <div className="header__left">
             <Logo />
               <Search setSearchQuery={setSearchQuery}/>
               </div> 
               <div></div>
            </div>
        </div>
     </div>
    );
};
