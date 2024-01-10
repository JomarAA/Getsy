import "./CreateItem.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkCreateItem, thunkGetAllItems, thunkGetOneItem, getCurrentItems } from "../../redux/item";
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
    const [quantity, setQuantity] = useState('')
    const [imageError, setImageError] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!image) {
            setImageError("Please select an image.");
            return; // Prevent form submission
        } else {
            setImageError(""); // Clear the image error when an image is selected
        }

        const item = new FormData()

        item.append("name", name)
        item.append("price", price)
        item.append("description", description)
        item.append("image", image)
        item.append("quantity", quantity)



        const newItem = await dispatch(thunkCreateItem(item))

        await dispatch(getCurrentItems)


        navigate(`/items/current`)

    }

    return (
        <div className="'create-item-container">
            <h2>Create a new product to sell</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data" className="create-item-form">

                <input
                    id="name-input"
                    type='text'
                    placeholder='What is your product called'
                    onChange={e => setName(e.target.value)}
                    value={name}
                />
                <input
                    id="description-input"
                    type='text'
                    placeholder='Describe your product'
                    onChange={e => setDescription(e.target.value)}
                    value={description}
                />
                <input
                    id="price-input"
                    type='number'
                    placeholder=''
                    onChange={e => setPrice(e.target.value)}
                    value={price}
                />
                <input
                    id="quantity-input"
                    type='number'
                    placeholder=''
                    onChange={e => setQuantity(e.target.value)}
                    value={quantity}
                />
                <label className="image-input">
                    <h3 className="h4-text">Upload images of your product</h3>
                    <input
                        className="inner-input"
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                    <div className="error-message">{imageError}</div>
                </label>
                <button className="item-submit">Submit</button>
            </form>


        </div>
    )
}

export default CreateItem
