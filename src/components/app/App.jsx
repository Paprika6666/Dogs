import React, { useEffect,useState } from 'react';
import { CardList } from '../CardList/CardList';
// import { Card } from '../Card/Card';
import { Footer } from '../Footer/Footer';
import { Header } from '../header/Header';
import './App.css';
import data from '../../data/data.json';
import { api, getProductList } from '../../Utils/api.js';
import { useDebounce } from '../../Utils/utils';
// import { Product } from '../Product/Product';
// import Datepicker from '../DatePicker/DatePicker';





function App() {
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery]=useState('');
  const [parentCounter, setParentCounter]=useState (0);
  const [currentUser, setCurrentUser]=useState ({});
  
const handleSearch = (search) => {
 api.searchProducts (search).then ((data) => setCards ([...data]));
};

const debounceValueInApp = useDebounce (searchQuery, 500);

function handleProductLike (product) {
  const isLiked = product.likes.some((el)=> el === currentUser._id);
    console.log ('product', product); 

  isLiked ?  api.deleteLike (product._id).then ((newCard)=>{
    const newCards = cards.map ((e) => e._id === newCard._id ? newCard : e);
setCards([...newCards]);
console.log('newCard', newCard);

  })
   : api.addLike (product._id).then ((newCard)=>{
    const newCards = cards.map ((e) => e._id === newCard._id ? newCard : e);
    setCards([...newCards]);
});
}
// console.log ('currentUser', currentUser._id);

useEffect(()=>{
 
  handleSearch (debounceValueInApp);
  // console.log ( {debounceValueInApp});
    }, [debounceValueInApp]);

    // console.log (cards, searchQuery);


      useEffect (()=> {

        Promise.all ([api.getUserInfo(), api.getProductList()]).then(
          ([userData, productData]) =>{
          setCurrentUser (userData);
          setCards (productData.products);
        });
        // api.getProductList().then ((data)=>setCards(data.products));
        // api.getUserInfo().then ((data) => setCurrentUser(data));
        // getProductList().then ((data) => setCards(data.products)); - без классов
      },[]);
  
  return (
    <>
     {/* heder */}
     <Header
      user = {currentUser}
      parentCounter ={parentCounter}
      searchQuery = {searchQuery}
      setSearchQuery={setSearchQuery}
      />
     {/* content */}
     <main className="content container">
      {searchQuery && <p> По запросу {searchQuery} найдено товаров: {cards.length} шт.</p>}
      {/* Card  */}
      <div className='content__cards'></div>
      <CardList currentUser = {currentUser} handleProductLike = {handleProductLike} setParentCounter = {setParentCounter} cards={cards}/>
      {/* <Datepicker /> */}
      {/* <Product currentUser ={currentUser} /> */}
     </main>
     {/* footer */}
     <Footer />
    </>
  );
}

export default App;
