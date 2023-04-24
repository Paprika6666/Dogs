import { Card } from "../Card/Card";
import './index.css';
// import data from '../../data/data.json';
import {useContext, useEffect, useState} from 'react';
import {CardContext} from '../context/CardContext'


export const CardList = ({cards}) => {

  const { setParentCounter, handleProductLike } = useContext(CardContext)

return (
    <div className='cards'>
      {cards.map((item) => {
             
        return (
          <Card
            key={item._id}
            product={item}
            onProductLike={handleProductLike}
            setParentCounter={setParentCounter}
            {...item}
           
          />
        ); 
      })}
    </div>
  );
};