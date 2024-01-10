const ADD_TO_CART = 'cart/ADD_TO_CART';
const REMOVE_FROM_CART = 'cart/REMOVE_FROM_CART';
const CLEAR_CART = 'cart/CLEAR_CART';


const addToCart = (item) => ({
  type: ADD_TO_CART,
  item,
});


const clearCart = () => ({
  type: CLEAR_CART,
});

export const thunkAddToCart = (id, item) => async (dispatch) => {
    const res = await fetch(`/api/cart/${id}`, {
        method:'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
    })

    if (res.ok) {
        const cartItem = await res.json()
        dispatch(addToCart(cartItem))
        return cartItem
    }

}


const initialState = {
  items: {},
};


const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
        return { ...state, cartItems: [...state.cartItems, action.item] };
    }
    case CLEAR_CART:
      return {
        ...state,
        items: {},
      };
    default:
      return state;
  }
};

export default cartReducer;
