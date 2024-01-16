import "./ItemDetails.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetOneItem } from "../../redux/item";
import { useParams } from "react-router-dom";
import { thunkAddToCart } from "../../redux/cart";

const ItemDetails = () => {
    const dispatch = useDispatch()

    const sessionUser = useSelector((state) => state.session.user);
    const { id } = useParams()

    const item = useSelector((state) => state.item.oneItem)


    console.log('%c   LOOK HERE', 'color: blue; font-size: 18px', sessionUser)

    useEffect(() => {
        dispatch(thunkGetOneItem(id));
    }, [dispatch]);


    const addToCart = () => {
        dispatch(thunkAddToCart(id, item))
    }

    if (!item) {
        return null
    }


    return (

        <div className='one_item_container' key={item.id}>


            <div className='display-components'>
                <img className='item-detail-img' src={item.image} alt='Item preview' />
            </div>
            <p className="itemName">{item.name}</p>
            <p className="itemDescription">{item.description}</p>
            <p className="itemPrice">{item.price}</p>
            <p className="itemQuantity">{item.quantity}</p>
            {sessionUser ? (
                item.sellerId !== sessionUser.id ? (
                    <button className="product-button" onClick={addToCart}>
                        Add to Cart
                    </button>
                ) : null
            ) : (
                null
            )}
        </div>


    )
}

export default ItemDetails
