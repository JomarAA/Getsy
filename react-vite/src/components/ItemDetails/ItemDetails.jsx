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
    const [loadingText, setLoadingText] = useState('');


    useEffect(() => {
        setIsLoading(true);
        dispatch(thunkGetOneItem(id))
            .then(() => {
                animateLoadingText("Loading...");
            })
            .catch((error) => {
                console.error('Failed to load item', error);
                setIsLoading(false);
            });
    }, [dispatch, id]);

    const animateLoadingText = (text) => {
        let fullText = '';
        let index = 0;
        const interval = setInterval(() => {
            fullText += text[index];
            setLoadingText(fullText);
            index++;
            if (index === text.length) {
                clearInterval(interval);
                setTimeout(() => setIsLoading(false), 1000);
            }
        }, 200);
    };

    const addToCart = () => {
        dispatch(thunkAddToCart(id, { quantity }))
        // window.alert('Item added to cart');
        navigate("/cart")
    }


    if (isLoading) {
        return (
            <div className="loading-container">
                <div className="typing-effect">
                    {loadingText}
                </div>
            </div>
        );
    }



    return (
        <div className="content-container">
            <div className='one_item_container' key={item.id}>

                <img id='item-detail-img' src={item.image} alt='Item preview' />

                <div className="item-details">
                    <h3 className="itemQuantity">{item.quantity} Available</h3>
                    <h2 className="itemPrice">$ {item.price}</h2>
                    <h3 className="itemName">Name: {item.name}</h3>
                    <h3 className="itemDescription">Description: {item.description}</h3>
                    {sessionUser && item.sellerId !== sessionUser.id && (
                        <div className="item-actions">
                            <select
                                className="quantity-select"
                                value={quantity}
                                onChange={(e) => setQuantity(Number(e.target.value))}
                            >


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
