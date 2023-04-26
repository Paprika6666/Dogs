import React, { useContext } from "react";
import { UserContext } from "../context/userContext";
import { ReactComponent as Like } from "./like.svg"
import './index.css';
import { Link } from "react-router-dom";
import {api} from "../../Utils/api";
import { findLike } from "../../Utils/utils";


export const Card = ({
  product, 
  pictures, 
  name, 
  discount, 
  price, 
  stock, 
  setParentCounter, 
  onProductLike, 
  })=>{
  const {currentUser} = React.useContext(UserContext);
 
  const isLiked = findLike(product,currentUser)
  const handleLikeClick = () => {
    onProductLike (product);
  };
 
const deleteCard = async () => {
  await api.deleteProductById (product._id);
}

    return (
        <div className="card">
          <div className='card__sticky card__sticky_type_top-left'>
            <span className="card__discount">{discount}%</span>
            </div>
          <div className="card__sticky card__sticky_type_top-right">
            <button className= {`card__favorite ${isLiked ? 'card__favorite_active' : ''}`} 
            onClick = {handleLikeClick}>
            <Like className='card__liked'/>
            </button>
          </div>
          <Link to ={`/product/${product._id}`} className="card__link">
            <img src={pictures} alt='card__image' className="card__image"/>
            <div className="='card__desc">
            <span className="card__price">{price}р</span>
            <span className="card__wight">{stock}pc</span>
            <p className="card__name">{name}</p>    
            </div>
          </Link>
          <span onClick= {() => setParentCounter((state)=>state+1)} className="card__cart btn btn_type_primary">В корзину</span>
          {/* удаление карточек */}
          {/* <button onClick ={deleteCard}>Delete</button>  */}
        </div>
    );
};