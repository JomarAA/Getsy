import { useState, useEffect } from "react";
import { thunkGetAllItems, thunkGetItemsByCategory } from "../../redux/item";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "./Item.css";
import ItemCard from "../ItemCard/ItemCard"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ItemDetCard from "../ItemCard/ItemDetCard";


export default function Items() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [category, setCategory] = useState('')
    const [showMenu, setShowMenu] = useState(false)
    const [isLoading, setIsLoading] = useState(true);
    const [loadingText, setLoadingText] = useState('Loading...');

    let items = useSelector((state) => state.item.allItems)

    useEffect(() => {
        setIsLoading(true);
        dispatch(thunkGetAllItems())
            .then(() => {
                animateLoadingText("Loading...");
            })
            .catch((error) => {
                console.error('Failed to load items', error);
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
                setIsLoading(false);
            }
        }, 1);
    };

    const CustomArrow = ({ className, style, onClick, arrowType }) => {
        const arrowIcon = arrowType === "next" ? "▶" : "◀";

        const arrowStyle = {
            ...style,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "rgba(236, 160, 20, 0.5)",
            fontSize: "20px",
            background: "none",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            cursor: "pointer",
        };

        return (
            <div className={className} style={arrowStyle} onClick={onClick}>
                {arrowIcon}
            </div>
        );
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 6,
        nextArrow: <CustomArrow arrowType="next" />,
        prevArrow: <CustomArrow arrowType="prev" />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ],
    };

    const itemsArr = Object.values(items)

    const popArr = itemsArr.slice(13, 19);

    const ranArr = itemsArr.slice(7, 11);

    const giftArr = itemsArr.slice(16, 25)


    useEffect(() => {
        if (category) {
            navigate(`/category/${category}`);
            setShowMenu(false);
        }
    }, [category, navigate]);

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
                <div className="main-content-container">
                    <h2 className="header">Welcome to Getsy!</h2>

                    <div className="category-container">
                        <h2 className="category-header">Shop by Category</h2>
                        <Slider {...settings}>
                            <div
                                className="single-category-container"
                                onClick={() => setCategory("Accessories")}
                            >

                                <img
                                    className="cat-img"
                                    src="https://getsy.s3.us-west-1.amazonaws.com/il_794xN.3545239327_6o90.jpeg"
                                />

                                <p className="category-label">Accessories</p>
                            </div>
                            <div
                                className="single-category-container"
                                onClick={() => setCategory("Art & Collectibles")}
                            >

                                <img
                                    className="cat-img"
                                    src="https://getsy.s3.us-west-1.amazonaws.com/il_794xN.5199383381_2wjz.jpeg"
                                />

                                <p className="category-label">Art & Collectibles</p>
                            </div>

                            <div
                                className="single-category-container"
                                onClick={() => setCategory("Baby")}
                            >

                                <img
                                    className="cat-img"
                                    src="https://getsy.s3.us-west-1.amazonaws.com/il_1588xN.1481574430_btva.jpeg"
                                />

                                <p className="category-label">Baby</p>
                            </div>

                            <div
                                className="single-category-container"
                                onClick={() => setCategory("Bags & Purses")}
                            >

                                <img
                                    className="cat-img"
                                    src="https://getsy.s3.us-west-1.amazonaws.com/il_340x270.2563255638_j6nq.jpeg"
                                />

                                <p className="category-label">Bags & Purses</p>
                            </div>

                            <div
                                className="single-category-container"
                                onClick={() => setCategory("Bath & Beauty")}
                            >

                                <img
                                    className="cat-img"
                                    src="https://getsy.s3.us-west-1.amazonaws.com/il_680x540.5610101734_bxvw.jpeg"
                                />

                                <p className="category-label">Bath & Beauty</p>
                            </div>

                            <div
                                className="single-category-container"
                                onClick={() => setCategory("Books, Movies & Music")}
                            >

                                <img
                                    className="cat-img"
                                    src="https://getsy.s3.us-west-1.amazonaws.com/il_680x540.5622208262_cdvw.jpeg"
                                />

                                <p className="category-label">Books, Movies & Music</p>
                            </div>

                            <div
                                className="single-category-container"
                                onClick={() => setCategory("Clothing")}
                            >

                                <img
                                    className="cat-img"
                                    src="https://getsy.s3.us-west-1.amazonaws.com/il_1588xN.2515107181_b7dy.jpeg"
                                />

                                <p className="category-label">Clothing</p>
                            </div>

                            <div
                                className="single-category-container"
                                onClick={() => setCategory("Craft Supplies & Tools")}
                            >

                                <img
                                    className="cat-img"
                                    src="https://getsy.s3.us-west-1.amazonaws.com/il_680x540.1607138151_7mpz.jpeg"
                                />

                                <p className="category-label">Craft Supplies & Tools</p>
                            </div>

                            <div
                                className="single-category-container"
                                onClick={() => setCategory("Electronics & Accessories")}
                            >

                                <img
                                    className="cat-img"
                                    src="https://getsy.s3.us-west-1.amazonaws.com/il_794xN.2934516109_t39i.jpeg"
                                />

                                <p className="category-label">Electronics & Accessories</p>
                            </div>

                            <div
                                className="single-category-container"
                                onClick={() => setCategory("Home & Living")}
                            >

                                <img
                                    className="cat-img"
                                    src="https://getsy.s3.us-west-1.amazonaws.com/il_1588xN.2240139670_i5dn.jpeg"
                                />

                                <p className="category-label">Home & Living</p>
                            </div>


                            <div
                                className="single-category-container"
                                onClick={() => setCategory("Jewlery")}
                            >

                                <img
                                    className="cat-img"
                                    src="https://getsy.s3.us-west-1.amazonaws.com/il_1588xN.599928682_abcm.jpeg"
                                />

                                <p className="category-label">Jewelry</p>
                            </div>
                        </Slider>
                    </div>

                    <p className="popular-items">Shop popular items</p>
                    <div className="clothing-grid">
                        <div id='main-img-container'>
                            <img id='main-img' src={items[11].image} alt='Item preview' onClick={() => navigate(`/items/13`)} />
                            <div className="price-container">
                                <p className="ran-item-price">${items[12].price}</p>
                            </div>
                        </div>
                        <div className="secondary-img-container">
                            {popArr.map(item => (
                                <div key={item.id}>
                                    <img className='secondary-img' src={item.image} alt='Item preview' onClick={() => navigate(`/items/${item.id}`)} />
                                    <div className="price-container">
                                        <p className="ran-item-price">${item.price}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="ran-items-container">
                        {ranArr.map(item => (
                            <div className="ran-item" key={item.id} onClick={() => navigate(`/items/${item.id}`)}>
                                <img className="ran-img" src={item.image} alt='Item preview' key={item.id} />
                                <p className="ran-name">{item.name}  &rarr;</p>
                            </div>
                        ))}
                    </div>

                    <div className="popular-gifts-container">
                        <p className="sub-cat-header">Popular gifts right now</p>
                        <div id='gift-img-container'>
                            {giftArr.map(item => (
                                <ItemDetCard item={item} key={item.id} />
                            ))}
                        </div>
                    </div>

                    <div className="trending-container">
                        <div className="popular-items">
                            <p id="trend-head">Trending Now</p>
                            <p id="sub-trend">Shop these unquie finds</p>
                        </div>
                        <img id='trend-big-img' src={items[11].image} alt='Item preview' />
                        <img id='trend-small-img' src={items[2].image} alt='Item preview' />
                        <img id='trend-big-img' src={items[10].image} alt='Item preview' />
                        <img id='main-big-img' src={items[12].image} alt='Item preview' />
                        <img id='second-big-img' src={items[4].image} alt='Item preview' />
                        <img id='second-small-img' src={items[14].image} alt='Item preview' />
                        <div className="popular-items">
                            <p id="sub-trend">Our resident expert, Jon Snow revealse the freshest trends you need to know</p>
                        </div>
                    </div>

                    <div className="items-grid">
                        {itemsArr.map(item => (
                            <ItemDetCard item={item} key={item.id} />))}
                    </div>
                </div>
            </div>
            <footer>
                <li> Developed by: Jomar Yanos</li>
                <li><NavLink to="https://www.linkedin.com/in/jomar-yanos-0a12b1233/" className='navLink'>Linkdin</NavLink> </li>
                <li><NavLink to="https://github.com/JomarAA" className='navLink'>Github</NavLink></li>
            </footer>
        </>
    )
}
