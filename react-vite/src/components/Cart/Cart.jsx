import "./Cart.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetCart } from "../../redux/item";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";


const Cart = () => {
    const dispatch = useDispatch()
    let sessionUser = useSelector((state) => state.session.user);
    let cartItems = useSelector((state) => state.item.cart)

    useEffect(() => {
        dispatch(thunkGetCart())
    }, [dispatch])

    if (!cartItems) {
        return null
    }

    const cartArr = Object.values(cartItems)

    console.log('%c   LOOK HERE', 'color: green; font-size: 18px', cartArr)



    return (
        <>
            <h1>Cart</h1>

            <div className='items_container'>
                {cartArr.map((item) => {
                    return (
                        <NavLink to={`/items/${item.id}`} className='one_item_container' key={item.id}>
                            {item.item}
                            <div className="items">
                                <div className='display-components'>
                                    <img id='item-img' src={item.image} alt='Item preview' />
                                </div>
                                <p className="itemName">{item.item_name}</p>
                                <p className="itemDescription">{item.item_description}</p>
                                <p className="itemPrice">{item.item_price}</p>
                                <p className="itemPrice">{item.item_quantity}</p>

                            </div>
                        </NavLink>
                    );
                })}
            </div>
        </>
    )
}


export default Cart
