import { useNavigate } from "react-router-dom";
import "./ItemDetCard.css";

export default function ItemDetCard({ item }) {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate(`/items/${item.id}`)
    }

    return (
        <div className="item-det-card" onClick={handleClick} title={item.name}>
            <img id='item-det-img' src={item.image} alt='Item preview' />
            <div className="item-name">{item.name}</div>
            <div className="item-det-price">${item.price}</div>

        </div>
    )
}
