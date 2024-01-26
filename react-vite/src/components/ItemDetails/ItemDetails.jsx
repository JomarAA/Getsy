import "./ItemDetails.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetOneItem } from "../../redux/item";
import { useNavigate, useParams } from "react-router-dom";
import { thunkAddToCart } from "../../redux/cart";
import { Navigate } from "react-router-dom";

const ItemDetails = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const { id } = useParams();
    const item = useSelector((state) => state.item.oneItem);
    const [quantity, setQuantity] = useState(1); // State to manage selected quantity
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate()

    useEffect(() => {
        setIsLoading(true);

        dispatch(thunkGetOneItem(id))
            .then(() => setIsLoading(false))
            .catch((error) => {
                console.error('Failed to load item', error);
                setIsLoading(false);
            });

    }, [dispatch, id]);

    const addToCart = () => {
        dispatch(thunkAddToCart(id, { quantity })) // Pass the selected quantity to the action
        // window.alert('Item added to cart');
        navigate("/cart")
    }

    // Render loading state if still loading
    if (isLoading) {
        return (
            <div className="loading-container">
                <div className="typing-effect">
                    Loading...
                </div>
            </div>
        );
    }

    // Render null if no item
    if (!item) {
        return null;
    }

    // Component UI
    return (
        <div className="content-container">
            <div className='one_item_container' key={item.id}>
                <div className='display-components'>
                    <img className='item-detail-img' src={item.image} alt='Item preview' />
                </div>
                <div className="item-details">
                    <h3 className="itemName">{item.name}</h3>
                    <p className="itemDescription">Description: {item.description}</p>
                    <p className="itemPrice">Price: {item.price}</p>
                    {sessionUser && item.sellerId !== sessionUser.id && (
                        <div className="item-actions">
                            <select
                                className="quantity-select"
                                value={quantity}
                                onChange={(e) => setQuantity(Number(e.target.value))}
                            >
                                {/* Generate dropdown options */}
                                {[...Array(10)].map((_, index) => (
                                    <option key={index} value={index + 1}>
                                        {index + 1}
                                    </option>
                                ))}
                            </select>
                            <button className="product-button" onClick={addToCart}>
                                Add to Cart
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ItemDetails;
