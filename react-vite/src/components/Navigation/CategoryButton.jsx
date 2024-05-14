// CategoryButton.jsx
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { thunkGetItemsByCategory } from "../../redux/item";
import "./CategoryButton.css"
function CategoryButton() {
    const [showMenu, setShowMenu] = useState(false);
    const dropdownRef = useRef();
    const navigate = useNavigate();
    const [category, setCategory] = useState('')

    const CATEGORY_CHOICES = ['Accessories', 'Art & Collectibles', 'Baby', 'Bags & Purses', 'Bath & Beauty', 'Books, Movies & Music', 'Clothing', 'Craft Supplies & Tools', 'Electronics & Accessories', 'Gifts', 'Home & Living', 'Jewlery']

    const toggleMenu = (e) => {
        e.stopPropagation();
        setShowMenu(!showMenu);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    useEffect(() => {
        if (category) {
            navigate(`/category/${category}`);
            setShowMenu(false);
        }
    }, [category, navigate]);

    return (
        <>
            <button onClick={toggleMenu} className="categories-button">
                <i className="fa-solid fa-bars"></i>
                Categories
            </button>
            {showMenu && (
                <ul className="category-dropdown" ref={dropdownRef}>
                    {CATEGORY_CHOICES.map((cat) => (
                        <li key={cat} className="navLink" onClick={() => setCategory(cat)}>
                            {cat}
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}

export default CategoryButton;
