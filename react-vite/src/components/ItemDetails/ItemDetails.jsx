import "./ItemDetails.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetOneItem } from "../../redux/item";
import { useParams } from "react-router-dom";
import { thunkAddToCart } from "../../redux/cart";

const ItemDetails = () => {
    const dispatch = useDispatch()

    const { id } = useParams()

    const item = useSelector((state) => state.item.oneItem)
    const sessionUser = useSelector((state) => state.session.user);


    // console.log('%c   LOOK HERE', 'color: blue; font-size: 18px', item)

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
        <>
            <div className='one_item_container' key={item.id}>
                {item.item}
                <div className="items">
                    <div className='display-components'>
                        <img id='item-img' src={item.image} alt='Item preview' />
                    </div>
                    <p className="itemName">{item.name}</p>
                    <p className="itemDescription">{item.description}</p>
                    <p className="itemPrice">{item.price}</p>
                    <p className="itemQuantity">{item.quantity}</p>
                    {item.sellerId !== sessionUser.id && (
                        <button className="addToCartButton" onClick={addToCart}>
                            Add to Cart
                        </button>
                    )}
                </div>
            </div>
        </>
    )
}

export default ItemDetails
