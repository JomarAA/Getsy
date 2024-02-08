import { useState, useEffect } from "react";
import { thunkGetItemsByCategory } from "../../redux/item";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./CategoryItems.css";
import ItemCard from "../ItemCard/ItemCard";
import { NavLink } from "react-router-dom";

function CategoryItems() {
    const [isLoading, setIsLoading] = useState(true);
    const [loadingText, setLoadingText] = useState('');

    const categoryHold = useParams();
    const categoryArr = Object.values(categoryHold);
    const category = categoryArr[0];
    const dispatch = useDispatch();
    let itemsArr = useSelector((state) => state.item.category);

    useEffect(() => {
        setIsLoading(true);
        dispatch(thunkGetItemsByCategory(category))
            .then(() => {
                animateLoadingText("Loading...");
            })
            .catch((error) => {
                console.error('Error loading items', error);
                setIsLoading(false);
            });
    }, [category, dispatch]);

    const animateLoadingText = (text) => {
        let fullText = '';
        let index = 0;
        const interval = setInterval(() => {
            fullText += text[index];
            setLoadingText(fullText);
            index++;
            if (index === text.length) {
                clearInterval(interval);
                // Remove setTimeout, update isLoading immediately after animation ends
                setIsLoading(false);
            }
        }, 1);
    };

    if (isLoading) {
        return (
            <div className="loading-container">
                <div className="typing-effect">
                    {loadingText}
                </div>
            </div>
        );
    }

    return (
        <>
            <div className='items-container'>
                <h1>Welcome to Getsy!</h1>
                <h2>Get what you want and what you need, all in one place, where creativity meets convenience.</h2>

                <div className="items-grid">
                    {itemsArr.map(item => (
                        <ItemCard item={item} key={item.id} />
                    ))}
                </div>
            </div>
            <footer>
                <li> Developed by: Jomar Yanos</li>
                <li><NavLink to="https://www.linkedin.com/in/jomar-yanos-0a12b1233/" className='navLink'>Linkdin</NavLink> </li>
                <li><NavLink to="https://github.com/JomarAA" className='navLink'>Github</NavLink></li>

            </footer>
        </>
    );
}

export default CategoryItems;
