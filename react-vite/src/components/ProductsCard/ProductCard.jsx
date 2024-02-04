import { useNavigate } from "react-router-dom";
import "./ProductCard.css";
import { thunkDeleteItem, getCurrentItems } from "../../redux/item";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import DeleteItemModal from "../DeleteItemModal/DeleteItemModal";

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

    // console.log('%c   LOOK HERE', 'color: blue; font-size: 18px', item)

    return (
        <div className="one-product">
            <img id='cart-img' onClick={handleClick} src={item.image} alt='Item preview' />
            <div className="cart-details" title={item.name}>
                <div id='item-name'>Name: {item.name}</div>
                <div id="item-category">Category:{item.category}</div>
                <div id='item-description'>Description:{item.description}</div>
                <div id='item-quantity'>Quantity:{item.quantity}</div>
                <div className="product-price">Price: ${item.price}</div>
                <div className="product-buttons-container">
                    <div className='update-product' onClick={() => handleUpdate(item.id)}><i className="fa-solid fa-pen-to-square"></i>Update Item</div>
                    <div className="delete-product">

                        <OpenModalMenuItem
                            itemText={(<><i className="fa-solid fa-trash-can"></i> Delete</>)}
                            modalComponent={<DeleteItemModal id={item.id} />}
                        />
                    </div>
                </div>
            </div>
        </div>

    )
}
