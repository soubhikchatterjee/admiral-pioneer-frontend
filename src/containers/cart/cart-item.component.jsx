import React from "react";
import { useDispatch } from "react-redux";

// Custom Components
import * as cartAction from "store/cart/cart.action";

function CartItem({ cart }) {
  const dispatch = useDispatch();

  if (!cart) {
    return "Loading...";
  }

  const handleRemoveItem = () => {
    dispatch(cartAction.removeProductFromCart(cart._id));
  };

  const calculateNetTotal = () => {
    const giftWrappingPrice = cart?.giftWrappingType?.price || 0;
    const totalPrice = (cart.product.price + giftWrappingPrice) * cart.quantity;
    const tax = cart?.product?.taxPercentage || 0;

    const priceAfterTax = tax
      ? totalPrice + (totalPrice * tax) / 100
      : totalPrice;

    const netTotal = priceAfterTax.toFixed(2);

    return netTotal;
  };

  return (
    <div className="cart_items">
      <ul className="cart_list">
        <li className="cart_item clearfix">
          <div className="cart_item_image">
            <img src={cart.product.imageUrl} alt="" />
          </div>
          <div className="cart_item_info d-flex flex-md-row flex-column justify-content-between">
            <div className="cart_item_name cart_info_col">
              <div className="cart_item_title">Name</div>
              <div className="cart_item_text">{cart.product.name}</div>
            </div>
            <div className="cart_item_quantity cart_info_col">
              <div className="cart_item_title">Quantity</div>
              <div className="cart_item_text">{cart.quantity}</div>
            </div>
            <div className="cart_item_price cart_info_col">
              <div className="cart_item_title">Price</div>
              <div className="cart_item_text">${cart.product.price}</div>
            </div>
            <div className="cart_item_price cart_info_col">
              <div className="cart_item_title">Tax %</div>
              <div className="cart_item_text">
                {cart?.product?.taxPercentage || 0}
              </div>
            </div>
            <div className="cart_item_price cart_info_col">
              <div className="cart_item_title">Gift Wrapping</div>
              <div className="cart_item_text">
                {cart?.giftWrappingRequired
                  ? `$${cart?.giftWrappingType?.price || 0}`
                  : "N/A"}
              </div>
            </div>
            <div className="cart_item_total cart_info_col">
              <div className="cart_item_title">Total</div>
              <div className="cart_item_text">${calculateNetTotal()}</div>
            </div>
          </div>
        </li>
      </ul>
      <button onClick={handleRemoveItem} className="btn btn-danger float-end ">
        Delete
      </button>
      <div className="clearfix"></div>
    </div>
  );
}

export default CartItem;
