import React, { useEffect,useState } from 'react';
import { CardList } from '../CardList/CardList';
// import { Card } from '../Card/Card';
import { Footer } from '../Footer/Footer';
import { Header } from '../header/Header';
import './App.css';
import data from '../../data/data.json';
import Datepicker from '../DatePicker/DatePicker';

function App() {
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery]=useState('');
  
  useEffect(()=>{
    console.log(searchQuery);
    if(!searchQuery){
      setCards(data);
    }

    const newState = data.filter ((e)=>
    (e.name.toLowerCase()).includes(searchQuery)
    );
    setCards(()=>[...newState]);
      }, [searchQuery]);

      // console.log (cards, searchQuery);
  
  return (
    <>
     {/* heder */}
     <Header setSearchQuery={setSearchQuery}/>
     {/* content */}
     <main className="content container">
      {searchQuery && <p> По запросу {searchQuery} найдено товаров: {cards.length} шт.</p>}
      {/* Card  */}
      {/* <div className='content__cards'></div> */}
      <CardList cards={cards}/>
      {/* <Datepicker /> */}
     </main>
     {/* footer */}
     <Footer />
    </>
  );
}

export default App;
