import { useNavigate } from "react-router-dom";
import "./CartCard.css";
import { thunkDeleteItem, getCurrentItems } from "../../redux/item";
import { thunkUpdateCart } from "../../redux/cart";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function CartCard({ item }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [newQuantities, setNewQuantities] = useState({});

    const handleClick = () => {
        navigate(`/items/${item.id}`)
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


    // console.log('%c   LOOK HERE', 'color: blue; font-size: 18px', item)

    return (
        <div className="product-card">
            <div className="product-card-content" onClick={handleClick} title={item.name}>
                <img id='item-img' src={item.image} alt='Item preview' />
                <div id='item-name'>Name: {item.name}</div>
                <div id='item-description'>Description:{item.description}</div>
                <div className="product-price">Price: ${item.price}</div>
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

    )
}
