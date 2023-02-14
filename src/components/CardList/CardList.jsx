import { Card } from "../Card/Card";
import './index.css';
// import data from '../../data/data.json';
import {useEffect, useState} from 'react';

export const CardList = ({cards}) => {
    return (
    <div className="cards">
        {cards.map((item)=>{
            return <Card {...item} key={item.name}/>; //rest operator
        })}
        
    </div>
    );
};