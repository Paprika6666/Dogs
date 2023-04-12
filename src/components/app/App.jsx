import React, { useEffect,useState, } from 'react';
import { Footer } from '../Footer/Footer';
import { Header } from '../header/Header';
import './App.css';
import { api } from '../../Utils/api.js';
import { useDebounce } from '../../Utils/utils';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { ProductPage } from '../../pages/ProductPage/ProductPage';
import { CatalogPage } from '../../pages/CatalogPage/CatalogPage.jsx';
import { UserContext } from '../../components/context/userContext';


// import Datepicker from '../DatePicker/DatePicker';

function App() {
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery]=useState(undefined);
  const [parentCounter, setParentCounter]=useState (0);
  const [currentUser, setCurrentUser]=useState ({});



  
// фильтрация по своему id
const filteredCards = (products, id) =>
products;
// {
//  console.log ({products, id})
  // return products.filter((e)=>e.author._id === id);
  // } 

  
const handleSearch = (search) => {
 api.searchProducts (search).then ((data) => setCards (filteredCards(data, currentUser._id)));
};
// const handleSearch = (search) => {
//   api.searchProducts (search).then ((data) => setCards ([...data]));
//  };

const debounceValueInApp = useDebounce (searchQuery, 500);

// console.log ({cards});
 
function handleProductLike (product) {
  const isLiked = product.likes.some((el)=> el === currentUser._id);
    
  isLiked 
  ?  api.deleteLike (product._id).then ((newCard)=>{
    const newCards = cards.map ((e) => e._id === newCard._id ? newCard : e);
setCards([...newCards]);
// setCards(filteredCards(newCards, currentUser._id)); //фильтрация
// console.log('newCard', newCard);
  })
   : api.addLike (product._id).then ((newCard)=>{
    const newCards = cards.map ((e) => e._id === newCard._id ? newCard : e);
    setCards([...newCards]);
    // setCards(filteredCards(newCards, currentUser._id)); //фильтрация
});
}
// console.log ('currentUser', currentUser._id);

const clickMe = async () => {
 await api.addProduct()
}

useEffect(()=>{
 if (debounceValueInApp === undefined) return;
//  console.log ('works');
  handleSearch (debounceValueInApp);
  // console.log ( {debounceValueInApp});
    }, [debounceValueInApp]);

    // console.log (cards, searchQuery);


      useEffect (()=> {

        Promise.all ([api.getUserInfo(), api.getProductList()]).then(
          ([userData, productData]) =>{
          setCurrentUser (userData);


          // фильтрация по своему id
          // const filteredCards = productData.products.filter((e)=>e.author._id === currentUser._id)
          // setCards (filteredCards);

           setCards (filteredCards(productData.products, userData._id));
        });
        // api.getProductList().then ((data)=>setCards(data.products));
        // api.getUserInfo().then ((data) => setCurrentUser(data));
        // getProductList().then ((data) => setCards(data.products)); - без классов
      },[]);

      const navigate = useNavigate();

      // console.log (UserContext);

      const setSortCards = (sort) => {
        console.log (sort)
        if (sort === 'Сначала дешевые') {
          const newCards = cards.sort ((a,b)=> a.price - b.price);
          setCards ([...newCards]);
        }
        if (sort === 'Сначала дорогие') {
          const newCards = cards.sort ((a,b)=> b.price - a.price);
          setCards ([...newCards]);
        }
        if (sort === 'Популярные') {
          const newCards = cards.sort ((a,b)=> b.likes.length - a.likes.length);
          setCards ([...newCards]);
        }
        if (sort === 'Новинки') {
          const newCards = cards.sort ((a,b)=> new Date(b.created_at) - new Date(a.created_at));
          setCards ([...newCards]);
        }
      }

  
  return (
    <>
    <UserContext.Provider value={{setSort: setSortCards, currentUser: currentUser, searchQuery, setSearchQuery, setParentCounter, parentCounter}}>
     {/* heder */}
     <Header
      parentCounter ={parentCounter}
            />
     
     <main className="content container">

      {/* <button onClick = {()=> clickMe ()}>Click</button> */}
      

    <Routes>

    <Route 
    path='/' 
    element={
      <CatalogPage 
      cards = {cards} 
      handleProductLike = {handleProductLike} 
      setParentCounter = {setParentCounter}
      />
      }
      ></Route>
        <Route path="/product/:productId" 
      element={<ProductPage setParentCounter={setParentCounter} handleProductLike={handleProductLike}/>}
      
      ></Route>
       {/* <Route path="fakeRout/:productId" 
      element={<ProductPage />}
      ></Route> */}
       <Route path="*" 
      element={<div className='Error'>404 PAGE NOT FOUND <button className='HomeBtn' onClick={()=>navigate ('/')}>Home</button></div>}
      ></Route>
    </Routes>
     </main>
     {/* footer */}
     <Footer />
     </UserContext.Provider>
    </>
  );
}

export default App;
