const ADD_TO_CART = 'cart/ADD_TO_CART';
const REMOVE_FROM_CART = 'cart/REMOVE_FROM_CART';
const CLEAR_CART = 'cart/CLEAR_CART';
const UPDATE_CART = 'cart/UPDATE_CART'

const addToCart = (item) => ({
  type: ADD_TO_CART,
  item,
});


const clearCart = () => ({
  type: CLEAR_CART,
});

const updateCart = (item) => ({
  type: UPDATE_CART,
  item
})

export const thunkUpdateCart = (id, quantity) => async (dispatch) => {
  const res = await fetch(`/api/cart/${id}/update`, {
    method: "PUT",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(quantity)
  })
  if (res.ok) {
    const updatedCartItem = await res.json()
    dispatch(updateCart(id, updatedCartItem))
    return updatedCartItem
  } else {
       console.log('status code:', res.status)
        console.log("POST error message")
        const error = await res.json();
        console.log('error', error)
        return error;
  }
}

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

export const thunkClearCart = () => async (dispatch) => {
  const res = await fetch(`/api/cart/checkout`, {
    method: 'DELETE',
    headers: { "Content-Type": "application/json" },
  })

  if (res.ok) {
    dispatch(clearCart())
    return 'Cart cleared successfully'
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
      case UPDATE_CART: {
        const updatedCartItems = state.cartItems.map((item) =>
          item.id === action.item.id ? action.item : item
        );
        return { ...state, cartItems: updatedCartItems };
      }
    default:
      return state;
  }
};

export default cartReducer;
