const LOAD_ALL_ITEMS = 'items/loadAllItems'
const LOAD_ONE_ITEM = 'items/loadOneItem'

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

const initialState = {}
let nextState

const itemsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ALL_ITEMS: {
            const newState = {...initialState};
            action.allItems.forEach((item) => newState[item.id] = item)
        return newState
        }
        case LOAD_ONE_ITEM: {
            nextState = {...state, oneItem: null}
            nextState.oneItem= {...action.item}
            return nextState
        }
    default:
        return state
    }
}

export default itemsReducer
