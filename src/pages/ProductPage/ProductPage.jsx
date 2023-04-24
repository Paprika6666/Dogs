import { useParams } from "react-router-dom";
import { Product } from "../../components/Product/Product"
import { useEffect, useState } from "react";
import { api } from "../../Utils/api";

export const ProductPage = ({currentUser, setParentCounter, handleProductLike}) => {

const id = useParams();
const [product, setProduct] = useState(null);


const onSendReview = (newProduct) => {
 setProduct (()=> ({...newProduct}));
}

useEffect(() => {
    if (!id?.productId){
        return
    }
    api.getProductById(id?.productId).then((data) => setProduct(data));
  }, [id?.productId]);



    return product ? <Product 
    product = {product}
    currentUser = {currentUser} 
    onSendReview={onSendReview}
    id = {id.productId}  
    setParentCounter={setParentCounter} 
    handleProductLike={handleProductLike}/>: 
    <div> Loading</div>;
};
