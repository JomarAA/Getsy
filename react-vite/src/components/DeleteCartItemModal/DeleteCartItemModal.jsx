import { useDispatch, useSelector } from 'react-redux';
import { useModal } from "../../context/Modal";
import '../DeleteItemModal/DeleteItemModel.css'
import { thunkRemoveFromCart } from '../../redux/cart';
import { thunkGetCart } from '../../redux/item';


const DeleteCartItemModal = ({ id }) => {
    const { closeModal } = useModal()
    const dispatch = useDispatch()

    const handleDelete = async (e) => {
        e.preventDefault()
        const result = await dispatch(thunkRemoveFromCart(id));

        await dispatch(thunkGetCart())
        closeModal()
    };

    return (
        <>
            <div id='delete_Question_container' className="login_container">
                <h2 className='delques'>Delete Product?</h2>
                <div className='delconfirm'>Are you sure you want to delete this Item?</div>
                <div className='modal-buttons'>
                    <button onClick={handleDelete}>Delete</button>
                    <button onClick={closeModal}>Cancel</button>
                </div>
            </div>
        </>
    )

}

export default DeleteCartItemModal
