import s from './index.module.css';
import truck from './img/truck.svg';
import quality from './img/quality.svg';
import cn from 'classnames';
import { ReactComponent as Save } from './img/save.svg';
import { useEffect, useState } from 'react';
import { api } from '../../Utils/api.js';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { CardContext } from '../context/CardContext';
import { UserContext } from '../context/userContext';
import { Rating } from '../Rating/Rating';
import { Form } from '../Form/Form';
import { useForm } from 'react-hook-form';
import { BaseButton } from '../BaseButton/BaseButton'
import { ReactComponent as Basket} from '../Product/img/basket.svg'
import { findLike } from '../../Utils/utils';



// const product_id = '63ecf77059b98b038f77b65f';

export const Product = ({ currentUser, id, product, onSendReview, onDeleteReview}) => {
  
  const [productCount, setProductCount] = useState(0);
  const isLiked = findLike(product,currentUser);
  const [liked, setLiked] = useState (false);
  const { setParentCounter, handleProductLike } = useContext(CardContext)
  const [rate, setRate] = useState(3);
  const [users, setUsers] = useState([]);
  const [currentRating, setCurrentRating] = useState(0);
  const [reviewsProduct, setReviewsProduct] = useState(product?.reviews.slice(0,5) ?? []);
  const [showForm, setShowForm] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onSubmit" });

  const sendReview = async (data) => {
    const newProduct = await api.addReview(product._id, {text:data.review, rating:rate})
    onSendReview(newProduct);
    setReviewsProduct(state => [...newProduct.reviews])
    setShowForm(false);
    reset();
  }
  
  const navigate = useNavigate();
  
  useEffect (() => {
    setLiked(isLiked);
  }, [currentUser]);
  
  const handleLike = () => {
    
    handleProductLike (product);
    setLiked ((st) =>!st)
  };
  
  // console.log({product});
  
  useEffect(() => {
    if (!product?.reviews) return;
    const rateAcc = (product.reviews.reduce((acc, el) => acc = acc + el.rating, 0));
    const accum = (Math.floor(rateAcc / product.reviews.length))
        // console.log (accum);
    setRate(accum);
    setCurrentRating(accum)
  }, [product?.reviews]);

  useEffect(() => {
    api.getUsers().then((data) => setUsers(data))
  }, []);

  // console.log(users);

  const getUser = (id) => {
    if (!users.length) return 'User';

    const user = users.find(e => e._id === id);
    if (user?.avatar.includes('default-image')) {
      return { ...user, avatar: 'https://thumbs.dreamstime.com/b/road-to-love-trees-shape-heart-58864200.jpg' }
    }
    return user
  }

  const deleteReview = async (id) => {
      const res = await onDeleteReview(id);
      setReviewsProduct(() => [...res.reviews])
    }

  const options = {
    day: "numeric",
    month: "short",
    year: "numeric"
  }

  const textRegister = register ('review', {
    required: 'Отзыв желателен',
  });

  

  return (
    <>
    <div>
      <span className='auth__info' onClick ={() => navigate(-1)}>{'<'}Назад</span>
      <h1>{product.name}</h1>
      <div className={s.rateInfo}>
        <span>Art <b>2388907</b></span>
       <Rating rate = {currentRating} setRate = {()=>{}}/>
        <span>{product?.reviews?.length} отзывов</span>
      </div>
    </div>
    
      <div className={s.product}>
             <div className={s.imgWrapper}>
          <img className={s.img} src={product.pictures} alt={`Изображение`} />
          {product.tags?.map((e) => (
            <span className={`tag tag_type_${e}`}>{e}</span>
          ))}
        </div>
        <div className={s.desc}>
          <span className={s.price}>{product.price}&nbsp;₽</span>
          {!!product.discount && (
            <span className={`${s.price} card__price_type_discount`}>
              {product.discount}&nbsp;%
            </span>
          )}
          <div className={s.btnWrap}>
            <div className={s.left}>
              <button className={s.minus} onClick = {()=> productCount > 0 && setProductCount((s)=>s-1)}>-</button>
              <span className={s.num}>{productCount}</span>
              <button className={s.plus} onClick = {()=> setProductCount((s)=>s+1)}>+</button>
            </div>
            <button onClick = {()=> setParentCounter ((state) => state + productCount) } 
            className={`btn btn_type_primary ${s.cart}`}>
              В корзину
            </button>
          </div>
          <button onClick = {handleLike}
          className={cn(s.favorite, { [s.favoriteActive]: liked })}>
            <Save />
            <span>{liked ? 'В избранном' : 'В избранное'}</span>
          </button>
          <div className={s.delivery}>
            <img src={truck} alt='truck' />
            <div className={s.right}>
              <h3 className={s.name}>Доставка по всему Миру!</h3>
              <p className={s.text}>
                Доставка курьером — <span className={s.bold}>от 399 ₽</span>
              </p>
            </div>
          </div>
          <div className={s.delivery}>
            <img src={quality} alt='quality' />
            <div className={s.right}>
              <h3 className={s.name}>Доставка по всему Миру!</h3>
              <p className={s.text}>
                Доставка курьером — <span className={s.bold}>от 399 ₽</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className={s.box}>
        <h2 className={s.title}>Описание</h2>
        <div>{product.description}</div>
        </div>
        <div>

        <div>
          <button className={s.btnRate} onClick = {()=> setShowForm(true)}> Добавить отзыв </button>
          {showForm &&  <div>
            <Form className={s.review__form}   submitForm={handleSubmit(sendReview)}>
              <Rating rate = {rate} isEditable = {true} setRate={setRate}/>
              <span>Оставьте ваш отзыв</span>
              <textarea className={s.review__form__text}
              placeholder='Ваш отзыв'
              {...textRegister} />
              <BaseButton style = {{width: '200px'}} color = {'white'} type='submit'> Отправить отзыв</BaseButton>
            </Form>
          </div>}
        </div>

          {users && reviewsProduct
          .sort((a,b)=>new Date(b.created_at) - new Date(a.created_at))
          .map((r) => <div key = {r._id} className= {s.review}>
           <div className={s.review__author}> 
           <div className={s.review__info}>
            <img className={s.review__avatar} src ={getUser(r.author)?.avatar} alt = 'avatar' />
            <span>{getUser(r.author)?.name ?? 'User'}</span>
            <span className={s.review__date}>{new Date (r.created_at).toLocaleString ('ru', options)} </span>
           </div>
           <Rating rate = {r.rating} isEditable = {false}/>
            </div>
           <div className={s.text}>
            <span>
            {r.text}
            </span>
            {/* <span>{r.author.name}</span> */}
            {/* console.log (currentUser);
             {currentUser._id===r.author && */}
            <Basket onClick ={()=> deleteReview(r._id)} className={s.img__basket}/>
             {/* } */}
             </div>
        </div>)}
      </div>
    </>
  );
};
