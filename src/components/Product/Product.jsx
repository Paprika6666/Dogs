import s from './index.module.css';
import truck from './img/truck.svg';
import quality from './img/quality.svg';
import cn from 'classnames';
import { ReactComponent as Save } from './img/save.svg';
import { useEffect, useState } from 'react';
import { api } from '../../Utils/api.js';

const product_id = '63ecf77059b98b038f77b65f';

export const Product = ({ currentUser, id, setParentCounter, handleProductLike }) => {
  const [product, setProduct] = useState({});
  const [productCount, setProductCount] = useState(0);
  const isLiked = product?.likes?.some((el) => el === currentUser?._id);
  const [liked, setLiked] = useState (false);

  useEffect(() => {
    api.getProductById(id).then((data) => setProduct(data));
  }, [id]);

useEffect (() => {
  setLiked(isLiked);
}, [currentUser]);

  console.log ({liked});
 

  const handleLike = () => {
   
    handleProductLike (product);
    setLiked ((st) =>!st)
  };

 

  return (
    <>
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
        {/* <h2 className={s.title}>Характеристики</h2>
        <div className={s.grid}>
          <div className={s.naming}>Вес</div>
          <div className={s.description}>1 шт 120-200 грамм</div>
          <div className={s.naming}>Цена</div>
          <div className={s.description}>490 ₽ за 100 грамм</div>
          <div className={s.naming}>Польза</div>
          <div className={s.description}>
            <p>
              Большое содержание аминокислот и микроэлементов оказывает
              положительное воздействие на общий обмен веществ собаки.
            </p>
            <p>Способствуют укреплению десен и жевательных мышц.</p>
            <p>
              Развивают зубочелюстной аппарат, отвлекают собаку во время смены
              зубов.
            </p>
            <p>
              Имеет цельную волокнистую структуру, при разжевывание получается
              эффект зубной щетки, лучше всего очищает клыки собак.
            </p>
            <p>Следует учесть высокую калорийность продукта.</p>
          </div>
        </div> */}
      </div>
    </>
  );
};
