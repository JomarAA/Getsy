import "./ItemDetails.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetOneItem } from "../../redux/item";
import { useParams } from "react-router-dom";

const ItemDetails = () => {
    const dispatch = useDispatch()

    const { id } = useParams()

    const item = useSelector((state) => state.item.oneItem)


    console.log('%c   LOOK HERE', 'color: blue; font-size: 18px', item)

    useEffect(() => {
        dispatch(thunkGetOneItem(id));
    }, [dispatch]);

    const handleAddToCart = () => {
        dispatch(thunkAddToCart(item));
    };

    const isItemInCart = cartItems.hasOwnProperty(item.id);

    if (!item) {
        return null
    }

    return (
        <>
            <div className="one_item_container" key={item.id}>
                {item.item}
                <div className="items">
                    <div className="display-components">
                        <img id="item-img" src={item.image} alt="Item preview" />
                    </div>
                    <p className="itemName">{item.name}</p>
                    <p className="itemDescription">{item.description}</p>
                    <p className="itemPrice">{item.price}</p>
                    {!isItemInCart ? (
                        <button className="addToCartButton" onClick={handleAddToCart}>
                            Add to Cart
                        </button>
                    ) : (
                        <p className="itemInCartMessage">Item is already in the cart</p>
                    )}
                </div>
            </div>
        </>
    );
};


export default ItemDetails