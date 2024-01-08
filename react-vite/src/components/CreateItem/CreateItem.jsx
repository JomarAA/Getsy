import "./CreateItem.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkCreateItem, thunkGetAllItems, thunkGetOneItem } from "../../redux/item";
import { useNavigate } from "react-router-dom";

const CreateItem = () => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.session.user);

    const navigate = useNavigate()

    useEffect(() => {
        if (!user) {
            navigate("/");
        }
    }, [user, navigate]);

    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')


    const handleSubmit = async (e) => {
        e.preventDefault()

        const item = {
            name,
            image,
            description,
            price: parseInt(price)
        }

        await dispatch(thunkCreateItem(item))

        await dispatch(thunkGetAllItems)

        const newItem = await dispatch(thunkGetOneItem(createdItem.id))

        navigate(`/items/${newItem.id}`)
    }

    return (
        <div className="'create-item-container">
            <h2>Create a new product to sell</h2>
            <form onSubmit={handleSubmit} className="create-item-form">

                <input
                    id="name-input"
                    type='text'
                    placeholder='What is your product called'
                    onChange={e => setName(e.target.value)}  //changes the state first
                    value={name}  //then we get it from the state
                />
                <input
                    id="description-input"
                    type='text'
                    placeholder='Describe your product'
                    onChange={e => setDescription(e.target.value)}  //changes the state first
                    value={description}  //then we get it from the state
                />
                <input
                    id="price-input"
                    type='text'
                    placeholder=''
                    onChange={e => setPrice(e.target.value)}  //changes the state first
                    value={price}  //then we get it from the state
                />
                <label className="image-input">
                    <h3 className="h4-text">Upload images of your product</h3>
                    <input
                        className="inner-input"
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                </label>
                <button className="item-submit">Submit</button>
            </form>


        </div>
    )
}

export default CreateItem
