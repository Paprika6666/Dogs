import { useContext } from "react";
import { CardList } from "../../components/CardList/CardList";
import { UserContext } from "../../components/context/userContext";
import './index.css';


export const CatalogPage = ({ cards, handleProductLike, setParentCounter}) => {
    
    
    const {searchQuery, setSort} = useContext(UserContext)

     const sortedItems = [{id: 'Популярные'}, {id: 'Новинки'}, {id: 'Сначала дешевые'}, {id: 'Сначала дорогие'}]
    
    return <>
    {searchQuery && (
    <p>
         По запросу {searchQuery} найдено товаров: {cards.length} шт.
         </p>
    )}
<div className="sort-cards">
{sortedItems.map((e)=>
<span key = {e.id} className="sort-item" onClick={()=>setSort(e.id)}>{e.id}</span>
)}
</div>


    <CardList
     handleProductLike = {handleProductLike} 
     setParentCounter = {setParentCounter} 
     cards={cards}
    />
    </>
};
