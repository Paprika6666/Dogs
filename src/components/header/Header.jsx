import { Logo } from '../Logo/logo';
import { Search } from '../Search/Search';

import './style.css';

import { ReactComponent as Profile } from './Icons/Profile.svg'
import { ReactComponent as Cart } from './Icons/Cart.svg'
import { ReactComponent as Likes } from './Icons/Likes.svg'

export const Header = ({setSearchQuery}) => {
    return (
    <div className='header' id='head'>
        <div className='container'>
            <div className='header__wrapper'>
              <div className="header__left">
               <Logo />
              </div>
              <div>
                <Search setSearchQuery={setSearchQuery}/>
              </div>
              <div className='header__right'>
               <Likes />
               <Cart />
               <Profile />
              </div>
            </div>
        </div>
     </div>
    );
};
