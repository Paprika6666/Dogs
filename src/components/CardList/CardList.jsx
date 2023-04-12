import { Card } from "../Card/Card";
import './index.css';
// import data from '../../data/data.json';
import {useEffect, useState} from 'react';

export const CardList = ({cards, setParentCounter, handleProductLike}) => {

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