import React from 'react';
import { useReducer } from 'react';

const CartContext = React.createContext({
  items: [],
  totalPrice: 0,
  addItem: (item) => { },
  removeItem: (id) => { },
  clearItem: (id) => { },
  clearCart: () => { },
  showCart: () => { },
})
const defaultCartState = {
  items: [],//{_id,title,price,amount}
  totalPrice: 0
};

const cartReducer = (state, action) => {
  if (action.type === 'ADD') {
    const updatedTotalPrice =
      state.totalPrice + action.item.price * action.item.amount;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id == action.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }


    return {
      items: updatedItems,
      totalPrice: updatedTotalPrice
    };
  }
  if (action.type === 'REMOVE') {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id == action.id
    );
    const existingItem = state.items[existingCartItemIndex];

    const updatedTotalPrice = state.totalPrice - existingItem.price;
    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter(item => item.id !== action.id);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    const cartIsShown = state.cartIsShown;
    return {
      items: updatedItems,
      totalPrice: updatedTotalPrice
    };
  }
  if (action.type === 'CLEAR_ITEM') {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id == action.id
    );
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalPrice = state.totalPrice - existingItem.amount * existingItem.price;
    const updatedItems = state.items.filter(item => item.id !== action.id);
    return {
      items: updatedItems,
      totalPrice: updatedTotalPrice
    };
  }
  if (action.type === 'CLEAR') {
    return defaultCartState;
  }
  if (action.type === 'SHOWCART') {
    const items = state.items;
    const totalPrice = state.totalPrice;
    return {
      items: items,
      totalPrice: totalPrice
    }
  }
  return defaultCartState;
};

export const CartContextProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: 'ADD', item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: 'REMOVE', id: id });
  };

  const clearItemHandler = (id) => {
    dispatchCartAction({ type: 'CLEAR_ITEM', id: id })
  };

  const clearCartHandler = () => {
    dispatchCartAction({ type: 'CLEAR' })
  };

  const showCart = () => {
    dispatchCartAction({ type: 'SHOWCART' })
  }

  const cartContext = {
    items: cartState.items,
    totalPrice: cartState.totalPrice,
    cartIsShown: cartState.cartIsShown,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearItem: clearItemHandler,
    clearCart: clearCartHandler,
    showCart: showCart
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContext;