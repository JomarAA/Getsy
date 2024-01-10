import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import './CurrentItems.css'
import { NavLink } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { getCurrentItems, thunkDeleteItem } from "../../redux/item";

const CurrentItems = () => {
    const dispatch = useDispatch()
    let sessionUser = useSelector((state) => state.session.user);
    const userItems = useSelector((state) => state.item.userItems)
    const userItemsArray = Object.values(userItems);
    console.log("%c   LOOK HERE", "color: red; font-size: 18px", userItemsArray)

    if (!sessionUser) {
        navigate('/')
    }

    if (!userItems) {
        return null
    }


    useEffect(() => {
        dispatch(getCurrentItems())
    }, [dispatch])



    const handleDelete = async (itemId) => {
        const result = await dispatch(thunkDeleteItem(itemId));
        console.log(result);

        await dispatch(getCurrentItems())
    };



    return (
        <>
            <div>
                {userItemsArray.map((item) => (
                    <div key={item.id} className="single_item">
                        <NavLink to={`/items/${item.id}`} className="navlink">
                            {/* Use NavLink to navigate to /items/:id */}
                            <img src={item.image} alt={item.name} />
                            <p>Name: {item.name}</p>
                            <p>Price: {item.price}</p>
                            <p>Quantity: {item.quantity}</p>
                        </NavLink>
                        <NavLink to={`/items/${item.id}/update`} className="update-link">
                            {/* Use Link to navigate to /items/:id/update */}
                            Update
                        </NavLink>
                        <button onClick={() => handleDelete(item.id)}>Delete Item</button>
                    </div>
                ))}
            </div>
        </>
    );
}


export default CurrentItems
