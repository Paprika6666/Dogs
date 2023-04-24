import React, { useEffect,useState, } from 'react';
import { Footer } from '../Footer/Footer';
import { Header } from '../header/Header';
import './App.css';
import { api } from '../../Utils/api.js';
import { useDebounce } from '../../Utils/utils';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { ProductPage } from '../../pages/ProductPage/ProductPage';
import { CatalogPage } from '../../pages/CatalogPage/CatalogPage.jsx';
import { UserContext } from '../../components/context/userContext';
import { FaqPage } from '../../pages/FAQ/FaqPage';
import { NotFound } from '../../pages/NotFound/NotFound';
import { CardContext } from '../context/CardContext';
import { Modal } from '../Modal/Modals';
import { Login } from '../Auth/Login/login';
import { Register } from '../Auth/Register/register';
import { ResetPass } from '../Auth/ResetPassword/Resetpassword';
import { parseJwt } from '../../Utils/parseJwt';

// import Datepicker from '../DatePicker/DatePicker';

function App() {
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery]=useState(undefined);
  const [parentCounter, setParentCounter]=useState (0);
  const [currentUser, setCurrentUser]=useState ({});
  const [favorites, setFavorites] = useState ([]); //- избранное
  const [formData, setFormData] = useState ([]);
  const [activeModal, setShowModal] = useState(false);
  const [isAuthentificated, setIsAuthentificated] = useState(false);


// фильтрация по своему id
const filteredCards = (products, id) =>
// products;
{
  return products.filter((e)=>e.author._id === id);
  } 
  
const handleSearch = (search) => {
 api.searchProducts (search).then ((data) => setCards (filteredCards(data, currentUser._id)));
};

const debounceValueInApp = useDebounce (searchQuery, 500);


function handleProductLike (product) {
  const isLiked = product.likes.some((el)=> el === currentUser._id);
    
  isLiked 
  ?  api.deleteLike (product._id).then ((newCard)=>{
    const newCards = cards.map ((e) => e._id === newCard._id ? newCard : e);
setCards([...newCards]);
  })
   : api.addLike (product._id).then ((newCard)=>{
    const newCards = cards.map ((e) => e._id === newCard._id ? newCard : e);
    setCards([...newCards]);
   });
}


const clickMe = async () => {
 await api.addProduct()
}

useEffect(()=>{
 if (debounceValueInApp === undefined) return;

  handleSearch (debounceValueInApp);
     }, [debounceValueInApp]);

       useEffect (()=> {

        Promise.all ([api.getUserInfo(), api.getProductList()]).then(
          ([userData, productData]) =>{
          setCurrentUser (userData);


          // фильтрация по своему id
          setCards (filteredCards(productData.products, userData._id));
        });
        },[isAuthentificated]);

      const navigate = useNavigate();

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
        };
      };

      // const sendData = async (data) => {
      //   // setFormData((s) => [...s, data]);
      //   const result = await api.registerUser({ ...data, group: "group-10" });
      //   console.log({ result });
      // };
  
      const location = useLocation();

          useEffect(() => {
        // const authPath = ['/reset-password', '/register']
        const token = localStorage.getItem('token')
        const uncodedToken = parseJwt(token);
        if (uncodedToken?._id) {
          setIsAuthentificated(true)
        }
        // else if (!authPath.includes(location.pathname)) {
        //   navigate('/login');
        // }
      }, [navigate]);

      const authRoutes = <> <Route
      path="login"
      element={
        <Modal activeModal={activeModal} setShowModal={setShowModal}>
          <Login setShowModal={setShowModal} />
        </Modal>
      }
    ></Route>
      <Route
        path="register"
        element={
          <Modal activeModal={activeModal} setShowModal={setShowModal}>
            <Register setShowModal={setShowModal} />
          </Modal>
        }
      ></Route>
      <Route
        path="reset-password"
        element={
          <Modal activeModal={activeModal} setShowModal={setShowModal}>
            <ResetPass setShowModal={setShowModal} />
          </Modal>
        }
      ></Route></>


  return (
    <>
    <UserContext.Provider value={{setSort: setSortCards, currentUser: currentUser, searchQuery, setSearchQuery, setParentCounter, parentCounter, isAuthentificated}}>
    <CardContext.Provider value = {{cards:cards, setParentCounter,handleProductLike, favorites, setFavorites}}>
     {/* heder */}
     <Header 
     setShowModal = {setShowModal}
     parentCounter ={parentCounter}
     />
     {isAuthentificated ?
     <main className="content container">

     {/* добавление карточек  */}
      {/* <button onClick = {()=> clickMe ()}>Click</button> */}
      

      <Routes>
                <Route path="/" element={<CatalogPage />}></Route>
                <Route
                  path="product/:productId"
                  element={<ProductPage />}
                ></Route>
                <Route
                  path="fakeRout/:productId"
                  element={<ProductPage />}
                ></Route>
                <Route path="faq" element={<FaqPage />}></Route>
                {/* <Route path="favorites" element={<Favorites />}></Route> */}
                {authRoutes}
                <Route path="*" element={<NotFound />}></Route>
              </Routes>
            </main>
            :
            <div className="not__auth">Пожалуйста, авторизуйтесь
              <Routes>
                {authRoutes}
              </Routes>

            </div>
          }
     <Footer />
     </CardContext.Provider>  
     </UserContext.Provider>
    </>
  );
}

export default App;
