const LOAD_ALL_ITEMS = 'items/loadAllItems'
const LOAD_ONE_ITEM = 'items/loadOneItem'
const CREATE_ITEM = 'items/createItem'
const LOAD_CART = 'items/cart'
const LOAD_USER_ITEMS = '/items/loadUserItems'
const UPDATE_ITEM= 'items/updateItem'
const DELETE_ITEM = 'items/deleteItem';
const LOAD_ITEMS_BY_CATEGORY = 'items/loadItemsByCategory';


const loadItemsByCategory = (items, category) => ({
    type: LOAD_ITEMS_BY_CATEGORY,
    payload: { items, category },
});


const deleteItem = (itemId) => ({
    type: DELETE_ITEM,
    itemId
});

const loadUserItems = (userItems) => {
    return {
        type: LOAD_USER_ITEMS,
        userItems
    }
}

const loadCart = (cart) => {
    return {
        type: LOAD_CART,
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

const updateItem = (item) => {
    return {
        type: UPDATE_ITEM,
        item
    }
}

export const thunkGetItemsByCategory = (category) => async (dispatch) => {
    const response = await fetch(`/api/items/category/${category}`);
    if (response.ok) {
        const items = await response.json();
        dispatch(loadItemsByCategory(items, category));
        return items;
    }
};

export const thunkDeleteItem = (id) => async (dispatch) => {
    const res = await fetch(`/api/items/${id}/delete`, {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
        dispatch(deleteItem(id));
        return 'Item deleted successfully';
    } else {
        console.error('Error deleting item');
        return 'Error deleting item';
    }
};

export const thunkGetCart = () => async (dispatch) => {
    const res = await fetch(`/api/cart/user`);
    if (res.ok) {
        const cartItems = await res.json()
        dispatch(loadCart(cartItems));
        return cartItems
    } else {
        const error = await res.json();
        return error;
    }
}

export const thunkCreateItem = (item) => async (dispatch) => {
    const res = await fetch(`/api/items/new`, {
        method: 'POST',
        body: item
      });

    if (res.ok) {
        const newItem = await res.json()
        dispatch(createItem(newItem))
        return
    } else {
        const error = await res.json();
        return error;
      }
}

export const thunkUpdateItem = (id, item) => async (dispatch) => {
    const res = await fetch(`/api/items/${id}/update`, {
        method: "PUT",
        body: item
    })

    if (res.ok) {
        const updatedItem = await res.json();
        dispatch(updateItem(id))
    } else {
        const updatedItem = await res.json()
        return updatedItem
    }
}


export const thunkGetAllItems = () => async (dispatch) => {
    const res = await fetch("/api/items");
    if (res.ok) {
        const allItems = await res.json();
        dispatch(loadAllItems(allItems))
        return allItems
    } else {
        console.log('/api/items error output');
    }
}

export const thunkGetOneItem = (id) => async (dispatch) => {
    const res = await fetch(`/api/items/${id}`);

    if (res.ok) {
        const itemDetails = await res.json()
        dispatch(loadOneItem(itemDetails))
        return itemDetails
    } else {
        console.log('/api/items/:id error output')
      }
}


export const getCurrentItems = () => async (dispatch) => {
    const res = await fetch(`/api/items/current`);
       if (res.ok) {

           const items = await res.json();

           dispatch(loadUserItems(items))
           return items
      }

}

const initialState = {
    userItems: [],
    allItems: [],
    cart: [],
    category: []
}


const itemsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ALL_ITEMS: {
            let newState = {...state, allItems:{...action.allItems}};
              return newState
        }
        case LOAD_ITEMS_BY_CATEGORY:
            return {
                ...state,
                category: action.payload.items
            };
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
            let newState = {...state, cart:{...action.cart}};
            return newState
        }
        case LOAD_USER_ITEMS: {
            let newState = {...state, userItems:{...action.userItems.item}};
              return newState
        }
        case UPDATE_ITEM: {
            const newState = {...state, [action.payload]: {...state[action.payload]}}
            return newState
        }
        case DELETE_ITEM: {
            const newState = { ...state };
            delete newState[action.itemId];
            return newState;
        }
    default:
        return state
    }
}

export default itemsReducer
