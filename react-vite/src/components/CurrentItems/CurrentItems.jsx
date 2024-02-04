import { useEffect, useState } from "react"
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
    const [isLoading, setIsLoading] = useState(true);
    const [loadingText, setLoadingText] = useState('');


    if (!sessionUser) {
        navigate('/')
    }

    if (!userItems) {
        return null
    }

    useEffect(() => {
        setIsLoading(true);
        dispatch(getCurrentItems())
            .then(() => {
                animateLoadingText("Loading...");
            })
            .catch((error) => {
                console.error('Error loading current items', error);
                setIsLoading(false);
            });
    }, [dispatch]);

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

    if (!isLoading) {
        return (
            <div className="your-product-container">
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
}


export default CurrentItems
