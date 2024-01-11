import "./Cart.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetCart } from "../../redux/item";
import { thunkClearCart, thunkUpdateCart } from "../../redux/cart";
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
    const [newQuantities, setNewQuantities] = useState({}); // Use an object to track quantities for each item
    const [image, setImage] = useState("");
    const [id, setId] = useState("");
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        dispatch(thunkGetCart());
    }, [dispatch]);

    if (!cartItems) {
        return null;
    }

    const cartArr = Object.values(cartItems);

    console.log('%c   LOOK HERE', 'color: green; font-size: 18px', cartItems);

    const handleClearCart = async (e) => {
        const confirmClear = window.confirm("Are you sure you want to checkout the cart?");
        if (confirmClear) {
            await dispatch(thunkClearCart());
            await dispatch(thunkGetCart())
        }
    }

    const handleUpdate = async (id) => {
        setSubmitted(true);
        const selectedItem = cartArr.find((item) => item.id === id);
        const quantity = {
            "quantity": newQuantities[id]
        }
        console.log('%c   LOOK HERE', 'color: red; font-size: 18px', selectedItem);
        const serverResponse = await dispatch(thunkUpdateCart(id, quantity));
        if (serverResponse) {
            await dispatch(thunkGetCart());
            await dispatch(thunkGetCart())
        }
    }

    return (
        <>
            <h1>Cart</h1>

            <div className="items_container">
                {cartArr.map((item) => {
                    return (
                        <div className="one_item_container" key={item.id}>
                            <div className="item-link">
                                <NavLink to={`/items/${item.id}`} className="item-link">
                                    <div className="display-components">
                                        <img id="item-img" src={item.image} alt="Item preview" />
                                    </div>
                                    <div className="itemName">{item.item_name}</div>
                                    <p className="itemDescription">{item.item_description}</p>
                                    <p className="itemPrice">{item.item_price}</p>
                                </NavLink>
                                <div className="quantity-control">
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
                                    <button onClick={() => handleUpdate(item.id)} className="quantity-submit">Update Item</button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            {cartArr.length > 0 && (
                <button onClick={handleClearCart} className="clear-cart-button">
                    Checkout Cart
                </button>
            )}
        </>
    );
}

export default Cart;
