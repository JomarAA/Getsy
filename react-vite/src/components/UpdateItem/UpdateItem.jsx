import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import './UpdateItem.css'
import { NavLink, useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { thunkUpdateItem, thunkGetOneItem, getCurrentItems } from "../../redux/item";

const UpdateItem = () => {
    const dispatch = useDispatch();
    let sessionUser = useSelector((state) => state.session.user);
    const { id } = useParams();
    const item = useSelector((state) => state.item.oneItem);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState({});

    const CATEGORY_CHOICES = ['Accessories', 'Art & Collectibles', 'Baby', 'Bags & Purses', 'Bath & Beauty', 'Books, Movies & Music', 'Clothing', 'Craft Supplies & Tools', 'Electronics & Accessories', 'Gifts', 'Home & Living', 'Jewelry'];

    // Fetch the item when the component mounts or the id changes
    useEffect(() => {
        if (!sessionUser) {
            navigate('/');
        } else if (id) {
            dispatch(thunkGetOneItem(id))
                .then(() => setIsLoading(false))
                .catch((error) => {
                    console.error('Failed to load the item', error);
                    setIsLoading(false);
                });
        }
    }, [dispatch, id, navigate, sessionUser]);

    // Populate the form fields when the item is loaded
    useEffect(() => {
        if (item) {
            setName(item.name);
            setDescription(item.description);
            setPrice(item.price);
            setQuantity(item.quantity);
            setImage(item.image);
            setCategory(item.category);
            setIsLoading(false); // Set loading to false when item data is populated
        }
    }, [item]);

    // Validate form fields whenever they change
    useEffect(() => {
        const validationErrors = {};

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
        else if (name.length < 3) {
            validationErrors.name = "Name must be at least 3 characters long"
        }

        if (!description) {
            validationErrors.description = "Please enter a description.";
        }
        else if (description.length < 4) {
            validationErrors.description = "Description must be at least 4 characters long"
        }

        if (!category) {
            validationErrors.category = "Please choose a category.";
        }

        if (!price) {
            validationErrors.price = "Please set a price for your product.";
        }
        else if (price < .5 || price > 9999999) {
            validationErrors.price = "Invalid price input";
        }

        if (!quantity) {
            validationErrors.quantity = "Please set the quantity available for your product.";
        }
        else if (quantity < 1 || quantity > 999999) {
            validationErrors.quantity = "Invalid quantity input";
        }

        setErrors(validationErrors);
    }, [name, price, description, quantity, image, category]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);

        if (Object.keys(errors).length) {
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("price", price);
        formData.append("description", description);
        formData.append("image", image);
        formData.append("quantity", quantity);
        formData.append("category", category);

        try {
            await dispatch(thunkUpdateItem(id, formData));
            await dispatch(getCurrentItems());
            navigate(`/items/current`);
        } catch (error) {
            console.error('Error updating item', error);
        } finally {
            setSubmitted(false);
        }
    };

    if (isLoading) {
        return (
            <div className="loading-container">
                <div className="typing-effect">Loading...</div>
            </div>
        );
    }

    if (!item) {
        return null;
    }


    return (

        <div className='one_item_container' key={item.id}>
            {item.item}
            <div className="product-edit">
                <h2>Edit your product</h2>
                <div className='display-components'>
                    <img className="item-detail-img" src={item.image} />
                </div>
                <form onSubmit={handleSubmit} encType="multipart/form-data" className="update-item-form">
                    <div id="image-input">
                        <div className="label-and-error">
                            <label htmlFor="image">Image</label>
                            {submitted && errors.image && (
                                <span className="error-message">{errors.image}</span>
                            )}
                        </div>
                        <input
                            id="image"
                            type="file"
                            onChange={(e) => setImage(e.target.files[0])}
                            placeholder='Image'
                        />
                    </div>

                    <div id="name-input">
                        <div className="label-and-error">
                            <label htmlFor="name">Name</label>
                            {submitted && errors.name && (
                                <span className="error-message">{errors.name}</span>
                            )}
                        </div>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder='Name'
                        />
                    </div>

                    <div id="category-input">
                        <div className="label-and-error">
                            <label htmlFor="category">Category</label>
                            {submitted && errors.category && (
                                <span className="error-message">{errors.category}</span>
                            )}
                        </div>
                        <select
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            {CATEGORY_CHOICES.map((choice, idx) => (
                                <option key={idx} value={choice}>{choice}</option>
                            ))}
                        </select>
                    </div>

                    <div id="description-input">
                        <div className="label-and-error">
                            <label htmlFor="description">Description</label>
                            {submitted && errors.description && (
                                <span className="error-message">{errors.description}</span>
                            )}
                        </div>
                        <input
                            id="description"
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder='Description'
                        />
                    </div>

                    <div id="price-input">
                        <div className="label-and-error">
                            <label htmlFor="price">Price</label>
                            {submitted && errors.price && (
                                <span className="error-message">{errors.price}</span>
                            )}
                        </div>
                        <input
                            id="price"
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder='Price'
                        />
                    </div>

                    <div id="quantity-input">
                        <div className="label-and-error">
                            <label htmlFor="quantity">Quantity</label>
                            {submitted && errors.quantity && (
                                <span className="error-message">{errors.quantity}</span>
                            )}
                        </div>
                        <input
                            id="quantity"
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            placeholder='Quantity'
                        />
                    </div>

                    <button className="item-submit">Submit</button>
                </form>
            </div>
        </div>

    )
}

export default UpdateItem
