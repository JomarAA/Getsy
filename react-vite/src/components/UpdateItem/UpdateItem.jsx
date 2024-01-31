import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import './UpdateItem.css'
import { NavLink, useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { thunkUpdateItem, thunkGetOneItem, getCurrentItems } from "../../redux/item";

const UpdateItem = () => {
    const dispatch = useDispatch()
    let sessionUser = useSelector((state) => state.session.user);
    const { id } = useParams()
    const item = useSelector((state) => state.item.oneItem)
    const navigate = useNavigate()

    // console.log('%c   LOOK HERE', 'color: blue; font-size: 18px', item)

    if (!sessionUser) {
        navigate('/')
    }


    useEffect(() => {
        if (id) {
            dispatch(thunkGetOneItem(id))
                .then(() => setIsLoading(false))
        }
    }, [dispatch, id]);

    if (!item) {
        return null
    }

    const CATEGORY_CHOICES = ['Accessories', 'Art & Collectibles', 'Baby', 'Bags & Purses', 'Bath & Beauty', 'Books, Movies & Music', 'Clothing', 'Craft Supplies & Tools', 'Electronics & Accessories', 'Gifts', 'Home & Living', 'Jewelry'];

    const [isLoading, setIsLoading] = useState(true);
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [quantity, setQuantity] = useState('')
    const [image, setImage] = useState('')
    const [category, setCategory] = useState('');

    const [submittted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState({})

    useEffect(() => {
        const validationErrors = {}

        if (image && image.name) {
            const validExtensions = ['.jpg', '.jpeg', '.png', '.pdf', '.gif'];
            const imageExtension = validExtensions.find(extension =>
                image.name.toLowerCase().endsWith(extension)
            );

            if (!imageExtension) {
                validationErrors.image = "File does not have an approved extension: jpg, jpeg, png, pdf, gif."
            }
        }
        // console.log('%c   LOOK HERE', 'color: red; font-size: 18px', image.name)

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

        setErrors(validationErrors)

    }, [name, price, description, quantity, image])

    useEffect(() => {
        if (item && isLoading) {
            setName(item.name)
            setDescription(item.description)
            setPrice(item.price)
            setQuantity(item.quantity)
            setImage(item.image)
            setCategory(item.category);
        }
    })

    const handleSubmit = async (e) => {
        e.preventDefault();

        setSubmitted(true)

        if (Object.values(errors).length) {
            return
        }

        const item = new FormData()

        item.append("name", name)
        item.append("price", price)
        item.append("description", description)
        item.append("image", image)
        item.append("quantity", quantity)
        item.append("category", category)

        // console.log('%c   LOOK HERE', 'color: red; font-size: 18px', item)

        let newItem = await dispatch(thunkUpdateItem(id, item))

        setSubmitted(false)

        await dispatch(getCurrentItems())


        navigate(`/items/current`)
    }

    return (

        <div className='one_item_container' key={item.id}>
            {item.item}
            <div className="product-edit">
                <h2>Edit your product</h2>
                <div className='display-components'>
                    <img className="item-detail-img" src={item.image} />
                </div>
                <form onSubmit={handleSubmit} encType="multipart/form-data" className="create-item-form">
                    <div id="image-input">
                        <div className="label-and-error">
                            <label htmlFor="image">image</label>
                        </div>
                        <input
                            id="image"
                            type="file"
                            onChange={(e) => {
                                setImage(e.target.files[0])
                            }}
                            placeholder='image'
                        />
                    </div>
                    <div className="errors">
                        {submittted && errors.image && (
                            <span className="error-message">{errors.image}</span>
                        )}
                    </div>
                    <div id="name-input">
                        <div className="label-and-error">
                            <label htmlFor="name">name</label>
                        </div>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value)
                            }}
                            placeholder='Name'
                        />
                    </div>
                    <div className="errors">
                        {submittted && errors.name && (
                            <span className="error-message">{errors.name}</span>
                        )}
                    </div>
                    <div id="category-input">
                        <div className="label-and-error">
                            <label htmlFor="category">Category</label>
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
                            <label htmlFor="description">Decription</label>
                        </div>
                        <input
                            id="description"
                            type="text"
                            value={description}
                            onChange={(e) => {
                                setDescription(e.target.value)
                            }}
                            placeholder='description'
                        />
                    </div>
                    <div className="errors">
                        <div className="errors">
                            {submittted && errors.description && (
                                <span className="error-message">{errors.description}</span>
                            )}
                            <div id="price-input">
                            </div>
                            <div className="label-and-error">
                                <label htmlFor="price">Price</label>
                            </div>
                            <input
                                id="price"
                                type="number"
                                value={price}
                                onChange={(e) => {
                                    setPrice(e.target.value)
                                }}
                                placeholder='Price'
                            />
                        </div>
                    </div>
                    {submittted && errors.price && (
                        <span className="error-message">{errors.price}</span>
                    )}
                    <div id="quantity-input">
                        <div className="label-and-error">
                            <label htmlFor="quantity">Quantity</label>
                        </div>
                        <input
                            id="quantity"
                            type="number"
                            value={quantity}
                            onChange={(e) => {
                                setQuantity(e.target.value)
                            }}
                            placeholder='Quantity'
                        />
                    </div>
                    <button className="item-submit">Submit</button>
                    <div className="errors">
                        {submittted && errors.quantity && (
                            <span className="error-message">{errors.quantity}</span>
                        )}
                    </div>
                </form>
            </div>
        </div>

    )
}

export default UpdateItem
