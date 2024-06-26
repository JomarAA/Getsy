import "./Cart.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetCart } from "../../redux/item";
import { thunkClearCart, thunkUpdateCart, thunkRemoveFromCart } from "../../redux/cart";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import DeleteCartItemModal from "../DeleteCartItemModal/DeleteCartItemModal";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";

const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let sessionUser = useSelector((state) => state.session.user);
    let cartItems = useSelector((state) => state.item.cart)
    const [newQuantities, setNewQuantities] = useState({});
    const [quantityErrors, setQuantityErrors] = useState({});
    const cartArr = Object.values(cartItems);
    const [isLoading, setIsLoading] = useState(true);




    const handleClearCart = async (e) => {
        const confirmClear = window.confirm("Are you sure you want to checkout the cart?");
        if (confirmClear) {
            await dispatch(thunkClearCart());
            await dispatch(thunkGetCart())
        }
    }

    const handleDelete = async (itemId) => {
        const result = await dispatch(thunkRemoveFromCart(itemId));

        await dispatch(thunkGetCart())
    };

    const handleClick = () => {
        navigate(`/items/${item.id}`)
    }

    const handleShop = () => {
        navigate(`/`)
    }

    const handleUpdate = async (id) => {
        setQuantityErrors({ ...quantityErrors, [id]: "" });
        const quantity = newQuantities[id] || 1;


        if (isNaN(quantity) || quantity < 1) {
            setQuantityErrors({ ...quantityErrors, [id]: "Quantity must be at least 1." });
            return;
        }

        const serverResponse = await dispatch(thunkUpdateCart(id, { quantity }));
        if (serverResponse) {
            await dispatch(thunkGetCart());
        }



    }


    const calculateTotal = () => {
        let total = 0;
        for (const item of cartArr) {
            total += item.item_price * (newQuantities[item.id] || item.item_quantity);
        }
        return total.toFixed(2);
    }

    const [loadingText, setLoadingText] = useState('');

    useEffect(() => {
        if (!sessionUser) {
            navigate("/");
        } else {
            dispatch(thunkGetCart())
                .then(() => {
                    animateLoadingText("Loading.....");
                })
                .catch((error) => {
                    console.error('Failed to load cart items', error);
                    setIsLoading(false);
                });
        }
    }, [sessionUser, navigate, dispatch]);

    const animateLoadingText = (text) => {
        let fullText = '';
        let index = 0;
        const interval = setInterval(() => {
            fullText += text[index];
            setLoadingText(fullText);
            index++;
            if (index === text.length) {
                clearInterval(interval);
                setTimeout(() => setIsLoading(false), 1);
            }
        }, 1);
    };

    if (isLoading) {
        return (
            <div className="loading-container">
                <div className="typing-effect">
                    {loadingText}
                </div>
            </div>
        );
    }

    if (!cartItems || !Object.values(cartItems).length) {
        return (
            <div className="items-container">
                <div className="product-container">
                    <h2>Your cart is empty. Discover something new to fill it up.</h2>
                    <button onClick={() => navigate('/')} className="quantity-button">
                        Shop Now
                    </button>
                </div>
            </div>
        );
    }



    return (
        <>
            <div className="items-container">
                <div className="product-container">
                    <h1 className="cart-header">{cartArr.length} items in your cart</h1>

                    <div className="cart-container"> {/* New wrapping div */}
                        {cartArr.length <= 0 ? (
                            <div className="empty-cart-message">
                                <h2>Your cart is empty. Discover something new to fill it up.</h2>
                                <button onClick={handleShop} className="product-button">
                                    Shop Now
                                </button>
                            </div>
                        ) : (
                            <div className="cart-item-container">
                                {cartArr.map((item) => (
                                    <div className="one-cart" item={item} key={item.id}>


                                        <img id="cart-img" src={item.image} alt="Item preview" />
                                        <div className="cart-details">

                                            <div id='item-name'>Name: {item.item_name}</div>
                                            <div id='item-description'>Description: {item.item_description}</div>
                                            <div id='item-quantity'>Price: {item.item_price}</div>

                                            <div className="quantity-control">
                                                Quantity:
                                                <input
                                                    type="number"
                                                    min="1"
                                                    value={newQuantities[item.id] || ''}
                                                    onChange={(e) => {
                                                        const value = parseInt(e.target.value, 10);
                                                        setNewQuantities((prevQuantities) => ({
                                                            ...prevQuantities,
                                                            [item.id]: value >= 1 ? value : 1
                                                        }));
                                                    }}
                                                    placeholder={item.item_quantity}
                                                />
                                                <div className="error-message">
                                                    {quantityErrors[item.id] && <span>{quantityErrors[item.id]}</span>}
                                                </div>
                                                <div className="cart-button-container">
                                                    <div className="update-cart-item" onClick={() => handleUpdate(item.id)}><i className="fa-solid fa-pen-to-square"></i>Update Item</div>
                                                    <div className="delete-product">

                                                        <OpenModalMenuItem
                                                            itemText={(<><i className="fa-solid fa-trash-can"></i> Delete</>)}
                                                            modalComponent={<DeleteCartItemModal id={item.id} />}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        {cartArr.length > 0 && (
                            <div className="checkout-container">
                                <p id="cart-total-details">
                                    <span id="cart-cat">Cart total </span>
                                    <span id="cart-price">${calculateTotal()}</span>
                                </p>
                                <button onClick={handleClearCart} className="quantity-button">
                                    Checkout Cart
                                </button>
                            </div>
                        )}
                    </div> {/* Closing tag for new wrapping div */}
                </div>
            </div>
            <footer>
                <li> Developed by: Jomar Yanos</li>
                <li><NavLink to="https://www.linkedin.com/in/jomar-yanos-0a12b1233/" className='navLink'>Linkdin</NavLink> </li>
                <li><NavLink to="https://github.com/JomarAA" className='navLink'>Github</NavLink></li>

            </footer>
        </>
    );
}

export default Cart;
