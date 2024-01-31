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
        } else {
            setTimeout(() => {
                setIsLoading(false);
            }, 2000);
        }
    }, [user, navigate]);

    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [quantity, setQuantity] = useState(1)
    const [category, setCategory] = useState('');
    const [errors, setErrors] = useState({})
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [loadingText, setLoadingText] = useState('Loading...');

    const CATEGORY_CHOICES = ['Accessories', 'Art & Collectibles', 'Baby', 'Bags & Purses', 'Bath & Beauty', 'Books, Movies & Music', 'Clothing', 'Craft Supplies & Tools', 'Electronics & Accessories', 'Gifts', 'Home & Living', 'Jewelry'];


    useEffect(() => {
        const validationErrors = {}

        if (!image) {
            validationErrors.image = "Please select an image.";
        }

        if (image && image.name) {
            const validExtensions = ['.jpg', '.jpeg', '.png', '.pdf', '.gif'];
            const imageExtension = validExtensions.find(extension =>
                image.name.toLowerCase().endsWith(extension)
            );

            if (!imageExtension) {
                validationErrors.image = "File does not have an approved extension: jpg, jpeg, png, pdf, gif."
            }
        }

        if (!name) {
            validationErrors.name = "Please enter a name.";
        }
        if (name.length < 3) {
            validationErrors.name = "Name must be at least 3 characters long"
        }
        if (!category) {
            validationErrors.category = "Please choose a category.";
        }

        if (!description) {
            validationErrors.description = "Please enter a description.";
        }
        if (description.length < 4) {
            validationErrors.description = "Description must be at least 4 characters long"
        }

        if (!price) {
            validationErrors.price = "Please set a price for your product.";
        }

        if (price < .5 || price > 9999999) {
            validationErrors.price = "Invalid price input";
        }

        if (!quantity) {
            validationErrors.quantity = "Please set the quantity available for your product.";
        }

        if (quantity < 1 || quantity > 999999) {
            validationErrors.quantity = "Invalid quantity input";
        }

        setErrors(validationErrors)

    }, [name, price, description, quantity, image, category])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);

        if (Object.keys(errors).length) {
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        setLoadingText('Submitting...'); // Update the loading text

        const item = new FormData();

        item.append("name", name)
        item.append("price", price)
        item.append("description", description)
        item.append("image", image)
        item.append("quantity", quantity)
        item.append("category", category)

        try {
            const serverResponse = await dispatch(thunkCreateItem(item));
            navigate(`/items/current`);
        } catch (error) {
            console.error('Submission error', error);
        } finally {
            setIsLoading(false);
        }
    }

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
                    <div className="errors">
                        {hasSubmitted && errors.category && (
                            <span className="error-message">{errors.category}</span>
                        )}
                    </div>
                    <select
                        id="category-input"
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                    >
                        <option value="">Select a Category</option>
                        {CATEGORY_CHOICES.map((cat, index) => (
                            <option key={index} value={cat}>{cat}</option>
                        ))}
                    </select>
                    <input
                        id="price-input"
                        type='text' // Use text to ensure users can enter decimal points
                        placeholder='Set a price for your product'
                        onChange={e => setPrice(e.target.value)} // Keep as string during input


                        value={price}
                    />

                    <div className="errors">
                        {hasSubmitted && errors.quantity && (
                            <span className="error-message">{errors.quantity}</span>
                        )}
                    </div>
                    <input
                        id="quantity-input"
                        className="hidden"
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
