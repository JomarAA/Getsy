import "./ItemDetails.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetOneItem } from "../../redux/item";
import { useNavigate, useParams } from "react-router-dom";
import { thunkAddToCart } from "../../redux/cart";
import { NavLink } from "react-router-dom";

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
                // Remove setTimeout, update isLoading immediately after animation ends
                setIsLoading(false);
            }
        }, 1);
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


    if (!item) {
        return (
            <div className="error-page">
                <h2>
                    Uh oh!
                </h2>
                <p>Sorry, the page you were looking for was not found.</p>
                <button onClick={() => navigate('/')} className="quantity-button">
                    Shop Now
                </button>
            </div>
        );
    }

    return (
        <>

            <div className="content-container">
                <div className='item_detail_container' key={item.id}>

                    <img id='item-detail-img' src={item.image} alt='Item preview' />

                    <div className="item-details">
                        <h3 className="itemQuantity">{item.quantity} Available</h3>
                        <h2 className="itemPrice">$ {item.price}</h2>
                        <h3 className="itemName">Name: {item.name}</h3>
                        <h3 className="itemDescription">Description: {item.description}</h3>
                        {sessionUser && (
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
            <footer className="footer-2">
                <li> Developed by: Jomar Yanos</li>
                <li><NavLink to="https://www.linkedin.com/in/jomar-yanos-0a12b1233/" className='navLink'>Linkdin</NavLink> </li>
                <li><NavLink to="https://github.com/JomarAA" className='navLink'>Github</NavLink></li>

            </footer>
        </>
    );
}

export default ItemDetails;
