import React, { useEffect, useState } from 'react';

import { Logo } from '../Logo/logo';
import { Search } from '../Search/Search';

import './style.css';

import { ReactComponent as Profile } from './Icons/Profile.svg'
// import { ReactComponent as Cart } from './Icons/Cart.svg'
import { ReactComponent as Likes } from './Icons/Likes.svg'
import Basket from './Icons/Basket';



export const Header = ({setSearchQuery, searchQuery, parentCounter=0, user  }) => {

  const [state, setState] = useState (parentCounter);
  const [counter, setCounter] = useState (0);
  // console.log(state);
  // console.log(counter);
  const handleClick = ()=> {
    setState ((st) => !st);
  };
    useEffect(()=>{
      setCounter (counter+1)
    }, [state, parentCounter]);


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
               <Basket count= {counter} />
               {/* <Cart /> */}
               <Profile />
              
              </div>
              {/* <button className ='btn' onClick ={()=> handleClick()}>В корзину</button>
              <button disabled = {counter <= 0}
              className ='btn' onClick ={()=> setCounter (counter-1)}>удалить из корзины</button> */}
              <div>
              <span>{user.email} {' '} </span>
                <span>{user.name}</span>
                <span>{user.about}</span>
                <div></div>
              </div>
            </div>
        </div>
     </div>
    );
};