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


    let items = useSelector((state) => state.item.allItems)


    useEffect(() => {
        dispatch(thunkGetAllItems());
    }, [dispatch]);

    if (!items) {
        return null
    }

    const CustomArrow = ({ className, style, onClick, arrowType }) => (
        <div
            className={className}
            style={{ ...style, display: "block", background: "rgba(236, 160, 20, 0.889)" }} // Custom styles
            onClick={onClick}
        >
            {arrowType === "next" ? ">" : "<"} {/* Example content */}
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

    console.log('%c   LOOK HERE', 'color: green; font-size: 18px', itemsArr)


    const CATEGORY_CHOICES = ['Accessories', 'Art & Collectibles', 'Baby', 'Bags & Purses', 'Bath & Beauty', 'Books, Movies & Music', 'Clothing', 'Craft Supplies & Tools', 'Electronics & Accessories', 'Home & Living', 'Jewelry'];

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

            <Slider {...settings}>
                <div
                    className="single-category-container"
                    onClick={() => setCategory("Accessories")}
                >

                    <img
                        className="cat-img"
                        src="https://getsy.s3.us-west-1.amazonaws.com/il_794xN.3545239327_6o90.jpeg"
                    />

                    <p>Accessories</p>
                </div>
                <div
                    className="single-category-container"
                    onClick={() => setCategory("Art & Collectibles")}
                >

                    <img
                        className="cat-img"
                        src="https://getsy.s3.us-west-1.amazonaws.com/il_794xN.5199383381_2wjz.jpeg"
                    />

                    <p>Art & Collectibles</p>
                </div>

                <div
                    className="single-category-container"
                    onClick={() => setCategory("Baby")}
                >

                    <img
                        className="cat-img"
                        src="https://getsy.s3.us-west-1.amazonaws.com/il_1588xN.1481574430_btva.jpeg"
                    />

                    <p>Baby</p>
                </div>

                <div
                    className="single-category-container"
                    onClick={() => setCategory("Bags & Purses")}
                >

                    <img
                        className="cat-img"
                        src="https://getsy.s3.us-west-1.amazonaws.com/il_340x270.2563255638_j6nq.jpeg"
                    />

                    <p>Bags & Purses</p>
                </div>

                <div
                    className="single-category-container"
                    onClick={() => setCategory("Bath & Beauty")}
                >

                    <img
                        className="cat-img"
                        src="https://getsy.s3.us-west-1.amazonaws.com/il_680x540.5610101734_bxvw.jpeg"
                    />

                    <p>Bath & Beauty</p>
                </div>

                <div
                    className="single-category-container"
                    onClick={() => setCategory("Books, Movies & Music")}
                >

                    <img
                        className="cat-img"
                        src="https://getsy.s3.us-west-1.amazonaws.com/il_680x540.5622208262_cdvw.jpeg"
                    />

                    <p>Books, Movies & Music</p>
                </div>

                <div
                    className="single-category-container"
                    onClick={() => setCategory("Clothing")}
                >

                    <img
                        className="cat-img"
                        src="https://getsy.s3.us-west-1.amazonaws.com/il_1588xN.2515107181_b7dy.jpeg"
                    />

                    <p>Clothing</p>
                </div>

                <div
                    className="single-category-container"
                    onClick={() => setCategory("Craft Supplies & Tools")}
                >

                    <img
                        className="cat-img"
                        src="https://getsy.s3.us-west-1.amazonaws.com/il_680x540.1607138151_7mpz.jpeg"
                    />

                    <p>Craft Supplies & Tools</p>
                </div>

                <div
                    className="single-category-container"
                    onClick={() => setCategory("Electronics & Accessories")}
                >

                    <img
                        className="cat-img"
                        src="https://getsy.s3.us-west-1.amazonaws.com/il_794xN.2934516109_t39i.jpeg"
                    />

                    <p>Electronics & Accessories</p>
                </div>

                <div
                    className="single-category-container"
                    onClick={() => setCategory("Home & Living")}
                >

                    <img
                        className="cat-img"
                        src="https://getsy.s3.us-west-1.amazonaws.com/il_1588xN.2240139670_i5dn.jpeg"
                    />

                    <p>Home & Living</p>
                </div>


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
            </Slider>

            <div className="items-grid">
                {itemsArr.map(item => (
                    <ItemCard item={item} key={item.id} />))}
            </div>
        </div>

    )
}
