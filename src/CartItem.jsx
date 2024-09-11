import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping, onRemoveItem }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotalAmount = (items) => {
    if (!items || !Array.isArray(items)) {
      return 0;
    }

    return items
      .map(item => {
        const itemCost = parseFloat(item.cost.replace('$', ''));
        return itemCost * item.quantity;
      })
      .reduce((total, itemTotal) => total + itemTotal, 0)
      .toFixed(2);
  };

  const handleCheckout = () => {
    alert("Coming Soon!");
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity === 1) {
      handleRemove(item);
    } else {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem({ name: item.name }));
    onRemoveItem(item.name); // Notify `ProductList` that an item was removed
  };


  const calculateTotalCost = (item) => {
    const itemCost = parseFloat(item.cost.replace('$', ''));
    return (itemCost * item.quantity).toFixed(2);
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount(cart)}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={() => onContinueShopping()}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={handleCheckout}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


