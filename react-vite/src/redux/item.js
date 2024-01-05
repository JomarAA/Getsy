const LOAD_ALL_ITEMS = 'items/loadAllItems'

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

const initialState = {}

const itemsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ALL_ITEMS: {
            const newState = {...initialState};
            action.allItems.forEach((item) => newState[item.id] = item)
        return newState
        }
    default:
        return state
    }
}

export default itemsReducer
