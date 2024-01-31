import { useState, useEffect } from "react";
import { thunkGetAllItems, thunkGetItemsByCategory } from "../../redux/item";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "./CategoryItems.css";
import ItemCard from "../ItemCard/ItemCard"


function CategoryItems() {

    const categoryHold = useParams()

    const categoryArr = Object.values(categoryHold)

    const category = categoryArr[0]

    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(thunkGetItemsByCategory(category));
    }, [category, dispatch]);

    console.log('%c   LOOK HERE', 'color: green; font-size: 18px', category)

    let itemsArr = useSelector((state) => state.item.category)

    // console.log('%c   LOOK HERE', 'color: green; font-size: 18px', itemsArr)


    return (
        <div className='items-container'>
            <h1>Welcome to Getsy!</h1>
            <h2>Get what you want and what you need, all in one place, where creativity meets convenience.</h2>

            <div className="items-grid">
                {itemsArr.map(item => (
                    <ItemCard item={item} key={item.id} />))}
            </div>
        </div>
    )
}

export default CategoryItems
