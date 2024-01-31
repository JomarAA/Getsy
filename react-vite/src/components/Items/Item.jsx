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
                setTimeout(() => setIsLoading(false), 1000);
            }
        }, 200);
    };


    const CustomArrow = ({ className, style, onClick, arrowType }) => (
        <div
            className={className}
            style={{ ...style, display: "block", background: "rgba(236, 160, 20, 0.889)" }}
            onClick={onClick}
        >
            {arrowType === "next" ? ">" : "<"}
        </div>
    );

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
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

        <div className='items-container'>
            <h2 className="header">Welcome to Getsy!</h2>
            <h2 className="subheader">Get what you want and what you need, all in one place, where creativity meets convenience.</h2>
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

            <div className="items-grid">
                {itemsArr.map(item => (
                    <ItemCard item={item} key={item.id} />))}
            </div>
        </div>

    )
}
