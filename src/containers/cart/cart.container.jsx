import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Custom Components
import * as cartAction from "store/cart/cart.action";
import CartItem from "./cart-item.component";

// Styles
import "./cart.styles.css";

function Cart() {
  const dispatch = useDispatch();
  const cartResponse = useSelector(
    state => state.cart[cartAction.GET_ALL_CART_ITEMS]
  );

  const [totalItems, setTotalItems] = useState(0);

  // Fetch all cart items
  useEffect(() => {
    dispatch(cartAction.getAllCartItems());
  }, []);

  useEffect(() => {
    if (cartResponse) {
      setTotalItems(
        cartResponse.reduce((prev, next) => prev + next.quantity, 0)
      );
    }
  }, [cartResponse]);

  const calculateGrandTotal = () => {
    return cartResponse.reduce((prev, cart) => {
      const giftWrappingPrice = cart?.giftWrappingType?.price || 0;
      const totalPrice =
        (cart.product.price + giftWrappingPrice) * cart.quantity;
      const tax = cart?.product?.taxPercentage || 0;
      const priceAfterTax = tax
        ? totalPrice + (totalPrice * tax) / 100
        : totalPrice;
      const total = +priceAfterTax.toFixed(2);
      return prev + total;
    }, 0);
  };

  return (
    <div className="cart_section">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-10 offset-lg-1">
            <div className="cart_container">
              <div className="cart_title">
                Shopping Cart &nbsp;
                <small>({totalItems || 0} item(s) in your cart) </small>
              </div>
              {/* Cart Items */}
              {cartResponse?.map(cart => (
                <CartItem cart={cart} />
              ))}
              <div className="order_total">
                <div className="order_total_content text-md-right">
                  <div className="order_total_title">Order Total:</div>
                  <div className="order_total_amount">
                    ${calculateGrandTotal().toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
