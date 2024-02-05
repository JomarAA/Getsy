import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

function AboutMe() {

    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

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


    return (
        <>
            <button onClick={toggleMenu} className={`storeLink`}>
                <i class="fa-solid fa-question"></i>
            </button>

            {showMenu && (
                <ul className="aboutme-dropdown" ref={ulRef}>
                    <li className="aboutme-header">Developer: Jomar Yanos</li>
                    <li><NavLink to="https://www.linkedin.com/in/jomar-yanos-0a12b1233/" className='navLink'>Linkdin</NavLink> </li>
                    <li><NavLink to="https://github.com/JomarAA" className='navLink'>Github</NavLink></li>
                </ul>
            )}
        </>
    )
}

export default AboutMe
