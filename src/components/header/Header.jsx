import React, { useContext, useEffect, useState } from 'react';
import { Logo } from '../Logo/logo';
import { Search } from '../Search/Search';
import './style.css';
import { ReactComponent as Profile } from './Icons/Profile.svg'
import { ReactComponent as Likes } from './Icons/Likes.svg'
import Basket from './Icons/Basket';
import { UserContext } from '../context/userContext';
import { CardContext } from '../context/CardContext';
import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as Login} from '../header/Icons/login.svg'
import { ReactComponent as Logout} from '../header/Icons/logout.svg'

export const Header = ({parentCounter=0, setShowModal }) => {
  const {currentUser, searchQuery, setSearchQuery, isAuthentificated} = useContext(UserContext);
  const [state, setState] = useState (parentCounter);
  const [counter, setCounter] = useState (0);
  const {favorites, setFavorites} = useContext (CardContext); //избранное

// console.log (favoriets);
 
  const handleClick = ()=> {
    setState ((st) => !st);
  };
    useEffect(()=>{
      setCounter (counter+1)
    }, [state, parentCounter]);

const navigate = useNavigate();

    const handleLogout = () => {
      localStorage.removeItem('token')
      navigate ('login');
    };

    return (
    <div className='header' id='head'>
        <div className='container'>
            <div className='header__wrapper'>
              <div className="header__left">
               <Logo />
              </div>
              <p className='company'>The Chair</p>
              <div>
                <Search setSearchQuery={setSearchQuery}/>
              </div>
              <div className='header__right'>
               <Basket count= {counter} />
               {/* <Profile /> */}
             
              {/* избранное */}
               <div>
               <Link to={"/favorites"} className="header__bubble-link">
              <Likes className="header__liked" />
              {favorites.length !== 0 && (
                <span className="header__bubble">{favorites.length}</span>
              )}
            </Link>
                </div>

               <div>
                {!isAuthentificated ? <Link to={'/login'} className='header__link' onClick = {()=> setShowModal(true)}>
                  <Login/>
                </Link> : 
                <span className='header__link' onClick = {handleLogout}><Logout/></span>
                }                          
                </div>
              {/* <button className ='btn' onClick ={()=> handleClick()}>В корзину</button>
              <button disabled = {counter <= 0}
              className ='btn' onClick ={()=> setCounter (counter-1)}>удалить из корзины</button> */}
             <div>
              <span>{currentUser.email} {' '} </span>
                <span>{currentUser.name}</span>
                <span>{currentUser.about}</span>
                </div>
              </div>
            </div>
        </div>
     </div>
    );
};