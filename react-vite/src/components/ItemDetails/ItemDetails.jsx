import "./ItemDetails.css";
import { useEffect, useState } from "react";
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

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);

        dispatch(thunkGetOneItem(id))
            .then(() => {
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Failed to load item', error);
                setIsLoading(false);
            });

    }, [dispatch, id]);

    if (isLoading) {
        return (
            <div className="loading-container">
                <div className="typing-effect">
                    Loading...
                </div>
            </div>
        );
    }


    const addToCart = () => {
        dispatch(thunkAddToCart(id, item))
        window.alert('Item added to cart');
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
            <p className="itemDescription">Description: {item.description}</p>
            <p className="itemPrice">Price: {item.price}</p>
            {/* <p className="itemQuantity">Available: {item.quantity}</p> */}
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
