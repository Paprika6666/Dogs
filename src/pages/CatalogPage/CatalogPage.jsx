import { useContext } from "react";
import { CardList } from "../../components/CardList/CardList";
import { UserContext } from "../../components/context/userContext";
import './index.css';
import { CardContext } from "../../components/context/CardContext";


export const CatalogPage = () => {

    const { searchQuery, setSort } = useContext(UserContext);
    const { cards } = useContext(CardContext)
  
    const sortedItems = [{id: 'Популярные'}, {id: 'Новинки'}, {id: 'Сначала дешевые'}, {id: 'Сначала дорогие'}]
  
  
    return <>
      {searchQuery && (
        <p>
          По запросу {searchQuery} найдено товаров: {cards?.length} шт.
        </p>
      )}
      <div className='sort-cards'>
        {sortedItems.map((e) =>
          <span key={e.id} className='sort-item' onClick={() => setSort(e.id)}>{e.id}</span>
        )}
      </div>
      <CardList cards={cards} />
    </>
  };
  