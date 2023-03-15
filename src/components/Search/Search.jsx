import './style.css';

export const Search = ({setSearchQuery, searchQuery})=> {
    return (<input placeholder='Поиск' 
    onChange={(e)=>setSearchQuery(e.target.value.toLowerCase())}
    className ="search__input"
    // value = {searchQuery ?? ''}
    />
    );
};