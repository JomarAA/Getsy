import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";


function StoreButton() {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Initialize useNavigate hook
    const [showMenu, setShowMenu] = useState(false);
    const user = useSelector((store) => store.session.user);
    const ulRef = useRef();
    const isActive = location.pathname === '/items/new' || location.pathname === '/items/current';

    const toggleMenu = (e) => {
        e.stopPropagation(); // Prevent event from bubbling up
        setShowMenu(!showMenu);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (ulRef.current && !ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    // Function to navigate and close menu
    const handleNavigate = (path) => {
        navigate(path);
        setShowMenu(false); // Close the menu after navigation
    };

    return (
        <>
            <button onClick={toggleMenu} className={`storeLink ${isActive ? "storeLink-active" : ""}`}>
                <i className="fa-solid fa-store"></i>
            </button>
            {showMenu && (
                <ul className="store-dropdown" ref={ulRef}>
                    <li onClick={() => handleNavigate('/items/new')} className="navLink">Share new product</li>
                    <hr></hr>
                    <li onClick={() => handleNavigate('/items/current')} className="navLink">Your products</li>
                </ul>
            )}
        </>
    );
}

export default StoreButton;
