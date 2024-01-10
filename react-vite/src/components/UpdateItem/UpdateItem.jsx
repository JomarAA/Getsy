import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import './UpdateItem.css'
import { NavLink, useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { thunkUpdateItem, thunkGetOneItem } from "../../redux/item";

const UpdateItem = () => {
    const dispatch = useDispatch()
    let sessionUser = useSelector((state) => state.session.user);
    const { id } = useParams()
    const item = useSelector((state) => state.item.oneItem)
    const navigate = useNavigate()

    console.log('%c   LOOK HERE', 'color: blue; font-size: 18px', item)

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

    const [isLoading, setIsLoading] = useState(true);
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [quantity, setQuantity] = useState('')
    const [image, setImage] = useState('')
    const [submittted, setSubmitted] = useState(false);

    useEffect(() => {
        if (item && isLoading) {
            setName(item.name)
            setDescription(item.description)
            setPrice(item.price)
            setQuantity(item.quantity)
            setImage(item.image)
        }
    })

    const handleSubmit = async (e) => {
        e.preventDefault();

        setSubmitted(true)

        const item = new FormData()

        item.append("name", name)
        item.append("price", price)
        item.append("description", description)
        item.append("image", image)
        item.append("quantity", quantity)

        let newItem = await dispatch(thunkUpdateItem(id, item))

        setSubmitted(false)

        if (newItem) {
            navigate(`/items/${id}`)
        }
    }

    return (
        <>
            <div className='one_item_container' key={item.id}>
                {item.item}
                <div className="items">
                    <div className='display-components'>
                        <img id='item-img' src={item.image} alt='Item preview' />
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
                        <div id="price-input">
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
                    </form>
                </div>
            </div>
        </>
    )
}

export default UpdateItem
