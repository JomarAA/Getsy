import { useNavigate } from "react-router-dom";
import "./ItemCard.css";

export default function ItemCard({ item }) {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate(`/items/${item.id}`)
    }

    console.log('%c   LOOK HERE', 'color: blue; font-size: 18px', item)

    return (
        <div className="item-card" onClick={handleClick} title={item.name}>
            <img id='item-img' src={item.image} alt='Item preview' />
            <div className="item-price">${item.price}</div>

        </div>
    )
}
