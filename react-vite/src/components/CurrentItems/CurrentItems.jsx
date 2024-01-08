import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import './CurrentItems.css'
import { NavLink } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { getCurrentItems } from "../../redux/item";

const CurrentItems = () => {
    const dispatch = useDispatch()
    let sessionUser = useSelector((state) => state.session.user);
    const userItems = useSelector((state) => state.item.userItems)
    const userItemsArray = Object.values(userItems);
    console.log("%c   LOOK HERE", "color: red; font-size: 18px", userItemsArray)

    if (!sessionUser) {
        navigate('/')
    }

    if (!userItems) {
        return null
    }


    useEffect(() => {
        dispatch(getCurrentItems())
    }, [dispatch])


    return (
        <>
            <div>
                {userItemsArray.map((item) => (
                    <div key={item.id}>
                        <img src={item.image} alt={item.name} />
                        <p>Name: {item.name}</p>
                        <p>Price: {item.price}</p>
                    </div>
                ))}
            </div>
        </>
    )
}


export default CurrentItems
