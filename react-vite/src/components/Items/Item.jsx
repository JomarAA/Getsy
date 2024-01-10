import { useState, useEffect } from "react";
import { thunkGetAllItems } from "../../redux/item";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "./Item.css";

const Items = () => {
    const dispatch = useDispatch();

    let items = useSelector((state) => state.item.allItems)


    useEffect(() => {
        dispatch(thunkGetAllItems());
    }, [dispatch]);

    if (!items) {
        return null
    }

    const itemsArr = Object.values(items)

    console.log('%c   LOOK HERE', 'color: green; font-size: 18px', itemsArr)






    return (
        <>
            <div className='items_container'>
                {itemsArr.map((item) => {
                    return (
                        <NavLink to={`/items/${item.id}`} className='one_item_container' key={item.id}>
                            {item.item}
                            <div className="items">
                                <div className='display-components'>
                                    <img id='item-img' src={item.image} alt='Item preview' />
                                </div>
                                <p className="itemName">{item.name}</p>
                                <p className="itemDescription">{item.description}</p>
                                <p className="itemPrice">{item.price}</p>

                            </div>
                        </NavLink>
                    );
                })}
            </div>
        </>
    )
}

export default Items
