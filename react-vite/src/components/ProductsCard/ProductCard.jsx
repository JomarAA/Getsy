import { useNavigate } from "react-router-dom";
import "./ProductCard.css";
import { thunkDeleteItem, getCurrentItems } from "../../redux/item";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function ProductCard({ item }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleClick = () => {
        navigate(`/items/${item.id}`)
    }

    const handleDelete = async (itemId) => {
        const confirmClear = window.confirm("Are you sure you want to delete this item?");
        const result = await dispatch(thunkDeleteItem(itemId));
        console.log(result);

        await dispatch(getCurrentItems())
    };

    const handleUpdate = () => {
        navigate(`/items/${item.id}/update`)
    }

    console.log('%c   LOOK HERE', 'color: blue; font-size: 18px', item)

    return (
        <div className="product-card">
            <div className="product-card-content" onClick={handleClick} title={item.name}>
                <img id='item-img' src={item.image} alt='Item preview' />
                <div id='item-name'>Name: {item.name}</div>
                <div id="item-category">Category:{item.category}</div>
                <div id='item-description'>Description:{item.description}</div>
                <div id='item-quantity'>Quantity:{item.quantity}</div>
                <div className="product-price">Price: ${item.price}</div>
            </div>
            <div className="product-button-container">
                <button className='product-button' onClick={() => handleUpdate(item.id)}>Update Item</button>
                <button className='product-button' onClick={() => handleDelete(item.id)}>Delete Item</button>
            </div>
        </div>

    )
}
