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
    const [errors, setErrors] = useState({})
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [isLoading, setIsLoading] = useState(false)



    useEffect(() => {
        const validationErrors = {}

        if (!image) {
            validationErrors.image = "Please select an image.";
        }
        if (!name) {
            validationErrors.name = "Please enter a name.";
        }

        if (!description) {
            validationErrors.description = "Please enter a description.";
        }

        if (!price) {
            validationErrors.price = "Please set a price for your product.";

        }

        if (!quantity) {
            validationErrors.quantity = "Please set the quantity available for your product.";
        }

        setErrors(validationErrors)

    }, [name, price, description, quantity, image])

    const handleSubmit = async (e) => {
        e.preventDefault()

        setHasSubmitted(true)

        if (!Object.values(errors).length) {



            const item = new FormData()

            item.append("name", name)
            item.append("price", price)
            item.append("description", description)
            item.append("image", image)
            item.append("quantity", quantity)

            setIsLoading(true)

            const serverResponse = await dispatch(thunkCreateItem(item))

            navigate(`/items/current`)
        }



    }

    return (
        <div className='create-item-wrapper'>
            <div className="'create-item-container">
                <h2>Create a new product to sell</h2>
                <form onSubmit={handleSubmit} encType="multipart/form-data" className="create-item-form">

                    <div className="errors">
                        {hasSubmitted && errors.name && (
                            <span className="error-message">{errors.name}</span>
                        )}
                    </div>
                    <input
                        id="name-input"
                        type='text'
                        placeholder='What is your product called'
                        onChange={e => setName(e.target.value)}
                        value={name}
                    />
                    <div className="errors">
                        {hasSubmitted && errors.description && (
                            <span className="error-message">{errors.description}</span>
                        )}
                    </div>
                    <input
                        id="description-input"
                        type='text'
                        placeholder='Describe your product'
                        onChange={e => setDescription(e.target.value)}
                        value={description}
                    />
                    <div className="errors">
                        {hasSubmitted && errors.price && (
                            <span className="error-message">{errors.price}</span>
                        )}
                    </div>
                    <input
                        id="price-input"
                        type='number'
                        placeholder='Set a price for your product'
                        onChange={e => setPrice(e.target.value)}
                        value={price}
                    />
                    <div className="errors">
                        {hasSubmitted && errors.quantity && (
                            <span className="error-message">{errors.quantity}</span>
                        )}
                    </div>
                    <input
                        id="quantity-input"
                        type='number'
                        placeholder='Set the quantity available for sale'
                        onChange={e => setQuantity(e.target.value)}
                        value={quantity}
                    />
                    <label className="image-input">
                        <h3 className="h4-text">Upload images of your product</h3>
                        <div className="errors">
                            {hasSubmitted && errors.image && (
                                <span className="error-message">{errors.image}</span>
                            )}
                        </div>
                        <input
                            className="inner-input"
                            type="file"
                            onChange={e => setImage(e.target.files[0])}
                        />
                        <button className="item-submit">Submit</button>
                    </label>
                </form>

            </div>
        </div>
    )
}

export default CreateItem
