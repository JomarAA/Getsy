import { useState, useEffect } from "react";
import { thunkGetAllItems, thunkGetItemsByCategory } from "../../redux/item";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "./Item.css";
import ItemCard from "../ItemCard/ItemCard"

export default function Items() {
    const dispatch = useDispatch();

    const navigate = useNavigate()

    const [category, setCategory] = useState('')


    let items = useSelector((state) => state.item.allItems)


    useEffect(() => {
        dispatch(thunkGetAllItems());
    }, [dispatch]);

    if (!items) {
        return null
    }

    const itemsArr = Object.values(items)

    console.log('%c   LOOK HERE', 'color: green; font-size: 18px', itemsArr)


    const CATEGORY_CHOICES = ['Accessories', 'Art & Collectibles', 'Baby', 'Bags & Purses', 'Bath & Beauty', 'Books, Movies & Music', 'Clothing', 'Craft Supplies & Tools', 'Electronics & Accessories', 'Gifts', 'Home & Living', 'Jewelry'];

    useEffect(() => {
        if (category) {
            navigate(`/category/${category}`);
            setShowMenu(false);
        }
    }, [category, navigate]);


    return (

        <div className='items-container'>
            <h1>Welcome to Getsy!</h1>
            <h2>Get what you want and what you need, all in one place, where creativity meets convenience.</h2>
            <div className="category-container">
                <div
                    className="single-category-container"
                    onClick={() => setCategory("Jewlery")}
                >

                    <img
                        className="cat-img"
                        src="https://getsy.s3.us-west-1.amazonaws.com/il_1588xN.599928682_abcm.jpeg"
                    />

                    <p>Jewelry</p>
                </div>
            </div>
            <div className="items-grid">
                {itemsArr.map(item => (
                    <ItemCard item={item} key={item.id} />))}
            </div>
        </div>

    )
}
