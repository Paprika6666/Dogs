import './style.css';

export const Search = ({setSearchQuery})=> {
    return (<input placeholder='Поиск' 
    onChange={(e)=>setSearchQuery(e.target.value)}
    className ="search__input"/>)
};