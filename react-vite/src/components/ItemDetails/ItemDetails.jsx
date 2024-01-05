import "./ItemDetails.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetOneItem } from "../../redux/item";
import { useParams } from "react-router-dom";

const ItemDetails = () => {
    const dispatch = useDispatch()

    const { id } = useParams()

    const item = useSelector((state) => state.item.oneItem)

    useEffect(() => {
        dispatch(thunkGetOneItem(id));
    }, [dispatch]);


    return (
        <></>
    )
}

export default ItemDetails
