import { useNavigate } from "react-router-dom"
import "./Errorpage.css"


export default function Errorpage() {

    const navigate = useNavigate()


    return (
        <div className="error-page">
            <h2>
                Uh oh!
            </h2>
            <p>Sorry, the page you were looking for was not found.</p>
            <button onClick={() => navigate('/')} className="quantity-button">
                Shop Now
            </button>
        </div>

    )
}
