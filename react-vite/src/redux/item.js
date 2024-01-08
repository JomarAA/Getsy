const LOAD_ALL_ITEMS = 'items/loadAllItems'
const LOAD_ONE_ITEM = 'items/loadOneItem'
const CREATE_ITEM = 'items/createItem'
const LOAD_CART = 'items/cart'
const LOAD_USER_ITEMS = '/items/loadUserItems'

const loadUserItems = (userItems) => {
    return {
        type: LOAD_USER_ITEMS,
        userItems
    }
}

const loadCart = (cart) => {
    return {
        type: ADD_CART_ITEM,
        cart
    }
}

const createItem = (item) => {
    return {
    type: CREATE_ITEM,
    item
    }
}

const loadOneItem = (item) => {
    return {
        type: LOAD_ONE_ITEM,
        item
    }
}

const loadAllItems = (allItems) => {
    return {
        type: LOAD_ALL_ITEMS,
        allItems
    }
}

export const thunkGetCart = () => async (dispatch) => {
    const res = await fetch('/api/cart');
    if (res.ok) {
        const cartItems = await res.json()
        dispatch(loadCart(cartItems));
        return cartItems
    } else {
        console.log('status code:', res.status)
        console.log("GET error message")
        const error = await res.json();
        console.log('error', error)
        return error;
    }
}

export const thunkCreateItem = (item) => async (dispatch) => {
    const res = await fetch(`/api/items/new`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      });

    if (res.ok) {
        const newItem = await res.json()
        dispatch(createItem(newItem))
        return newItem
    } else {
        console.log('status code:', res.status)
        console.log("POST error message")
        const error = await res.json();
        console.log('error', error)
        return error;
      }
}

export const thunkGetAllItems = () => async (dispatch) => {
    console.log("before fetch")
    const res = await fetch("/api/items");
    console.log("after fetch")
    if (res.ok) {
        const allItems = await res.json();
        dispatch(loadAllItems(allItems))
        return allItems
    } else {
        console.log('/api/items error output');
    }
}

export const thunkGetOneItem = (id) => async (dispatch) => {
    console.log("before fetch")
    const res = await fetch(`/api/items/${id}`);
    console.log("after fetch")

    if (res.ok) {
        const itemDetails = await res.json()
        dispatch(loadOneItem(itemDetails))
        return itemDetails
    } else {
        console.log('/api/items/:id error output')
      }
}


export const getCurrentItems = () => async (dispatch) => {

    console.log("before fetch")
    const res = await fetch(`/api/items/current`);
    console.log("after fetch")
       if (res.ok) {

           const items = await res.json();

           dispatch(loadUserItems(items))
           return items
      }


}

const initialState = {
    userItems: []
}


const itemsReducer = (state = initialState, action) => {
    console.log("%c   LOOK HERE", "color: purple; font-size: 18px", action)
    switch (action.type) {
        case LOAD_ALL_ITEMS: {
            const newState = {...initialState};
            action.allItems.forEach((item) => newState[item.id] = item)
        return newState
        }
        case LOAD_ONE_ITEM: {
            let nextState = {...state, oneItem: null}
            nextState.oneItem= {...action.item}
            return nextState
        }
        case CREATE_ITEM: {
            const newState = {...state, [action.item.id]: action.item}
            return newState
        }
        case LOAD_CART: {
            let newState = {...state};
            action.cartItems.forEach((item) => newState[item.id] = item)
            return newState
        }
        case LOAD_USER_ITEMS: {
            let newState = {...state, userItems:{...action.userItems.item}};

              return newState
        }
    default:
        return state
    }
}

export default itemsReducer
