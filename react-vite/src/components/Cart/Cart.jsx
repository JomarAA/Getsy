import "./Cart.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetCart } from "../../redux/item";
import { thunkClearCart, thunkUpdateCart, thunkRemoveFromCart } from "../../redux/cart";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let sessionUser = useSelector((state) => state.session.user);
    let cartItems = useSelector((state) => state.item.cart);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [newQuantities, setNewQuantities] = useState({});
    const [image, setImage] = useState("");
    const [id, setId] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [quantityErrors, setQuantityErrors] = useState({});

    useEffect(() => {
        dispatch(thunkGetCart());
    }, [dispatch]);

    if (!cartItems) {
        return null;
    }

    useEffect(() => {
        if (!sessionUser) {
            navigate("/");
        }
    }, [sessionUser, navigate]);

    const cartArr = Object.values(cartItems);

    console.log('%c   LOOK HERE', 'color: green; font-size: 18px', cartItems);

    const handleClearCart = async (e) => {
        const confirmClear = window.confirm("Are you sure you want to checkout the cart?");
        if (confirmClear) {
            await dispatch(thunkClearCart());
            await dispatch(thunkGetCart())
        }
    }

    const handleDelete = async (itemId) => {
        const result = await dispatch(thunkRemoveFromCart(itemId));
        console.log(result);

        await dispatch(thunkGetCart())
    };

    // const handleUpdate = async (id) => {
    //     setSubmitted(true);
    //     const selectedItem = cartArr.find((item) => item.id === id);
    //     const quantity = {
    //         "quantity": newQuantities[id]
    //     }
    //     console.log('%c   LOOK HERE', 'color: red; font-size: 18px', selectedItem);
    //     const serverResponse = await dispatch(thunkUpdateCart(id, quantity));
    //     if (serverResponse) {
    //         await dispatch(thunkGetCart());
    //         await dispatch(thunkGetCart())
    //     }
    // }

    const handleUpdate = async (id) => {
        setQuantityErrors({ ...quantityErrors, [id]: "" }); // Clear any previous errors
        const quantity = newQuantities[id] || 1; // Default to 1 if input is empty or invalid

        // Validate the input value
        if (isNaN(quantity) || quantity < 1) {
            setQuantityErrors({ ...quantityErrors, [id]: "Quantity must be at least 1." });
            return; // Exit if validation fails
        }

        const serverResponse = await dispatch(thunkUpdateCart(id, { quantity }));
        if (serverResponse) {
            await dispatch(thunkGetCart());
        }

        const handleClick = () => {
            navigate(`/items/${item.id}`)
        }
    }

    return (
        <div className="product-container">
            <h1>Cart</h1>

            <div className="product-grid">
                {cartArr.map((item) => (
                    <div className="product-card" item={item} key={item.id}>

                        <img id="item-img" src={item.image} alt="Item preview" />

                        <div id='item-name'>Name:{item.item_name}</div>
                        <div id='item-description'>Description:{item.item_description}</div>
                        <div id='item-quantity'>Price:{item.item_price}</div>

                        <div className="quantity-control">
                            Quantity:
                            <input
                                type="number"
                                value={newQuantities[item.id] || ''}
                                onChange={(e) => {
                                    setNewQuantities((prevQuantities) => ({
                                        ...prevQuantities,
                                        [item.id]: e.target.value
                                    }));
                                }}
                                placeholder={item.item_quantity}
                            />
                            <div className="error-message">
                                {quantityErrors[item.id] && <span>{quantityErrors[item.id]}</span>}
                            </div>
                            <div className="product-button-container">
                                <button onClick={() => handleUpdate(item.id)} className="product-button">Update Item</button>
                                <button className='product-button' onClick={() => handleDelete(item.id)}>Delete Item</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {cartArr.length > 0 && (
                <button onClick={handleClearCart} className="item-submit">
                    Checkout Cart
                </button>
            )}
        </div>
    );
}

export default Cart;
