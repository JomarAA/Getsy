import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import './CurrentItems.css'
import { NavLink } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { getCurrentItems, thunkDeleteItem } from "../../redux/item";
import ProductCard from "../ProductsCard/ProductCard";

const CurrentItems = () => {
    const dispatch = useDispatch()
    let sessionUser = useSelector((state) => state.session.user);
    const userItems = useSelector((state) => state.item.userItems)
    const userItemsArray = Object.values(userItems);
    const navigate = useNavigate()
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
        <div className="product-container">
            <h1>Your Products</h1>
            {userItemsArray.length === 0 ? (
                <div className="no-products-message">
                    <h2>You have no products, would you like to create a new item?</h2>
                    <NavLink to="/items/new">
                        <button className="item-submit">Create New Item</button>
                    </NavLink>
                </div>
            ) : (
                <div className="product-grid">
                    {userItemsArray.map((item) => (
                        <ProductCard item={item} key={item.id} />
                    ))}
                </div>
            )}
        </div>
    );
}


export default CurrentItems
