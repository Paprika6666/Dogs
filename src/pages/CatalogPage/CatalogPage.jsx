import { CardList } from "../../components/CardList/CardList";


export const CatalogPage = ({searchQuery, cards, currentUser, handleProductLike, setParentCounter}) => {
    return <>
    {searchQuery && (
    <p>
         По запросу {searchQuery} найдено товаров: {cards.length} шт.
         </p>
    )}
    <CardList
     currentUser = {currentUser} 
     handleProductLike = {handleProductLike} 
     setParentCounter = {setParentCounter} 
     cards={cards}
    />
    </>
};
