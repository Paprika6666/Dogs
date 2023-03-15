import { Card } from "../Card/Card";
import './index.css';
// import data from '../../data/data.json';
import {useEffect, useState} from 'react';

export const CardList = ({currentUser, cards, setParentCounter, handleProductLike}) => {

return (
    <div className='cards' >
      {cards.map((item) => {
        // console.log({ item });
        
        return (
          <Card
            key={item._id}
            currentUser={currentUser}
            product={item}
            onProductLike={handleProductLike}
            setParentCounter={setParentCounter}
            {...item}
           
          />
        ); // rest operator
      })}
    </div>
  );
};