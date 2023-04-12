import { useParams } from "react-router-dom";
import { Product } from "../../components/Product/Product"

export const ProductPage = ({currentUser, setParentCounter, handleProductLike}) => {

const id = useParams();

console.log (id);

    return <Product currentUser = {currentUser} id = {id.productId}  setParentCounter={setParentCounter} handleProductLike={handleProductLike}/>
};
