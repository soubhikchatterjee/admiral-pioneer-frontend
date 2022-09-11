import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";

// Custom Components
import * as giftWrapAction from "store/gift-wrap/gift-wrap.action";
import * as cartAction from "store/cart/cart.action";

// Styles
import "./product-modal.styles.css";

function ProductGiftWrapModal({
  product,
  showGiftOptions,
  setShowGiftOptions,
  showModal,
  setShowModal
}) {
  const dispatch = useDispatch();
  const [cart, setCart] = useState({
    product,
    quantity: 1,
    giftWrapId: null
  });
  const [errors, setErrors] = useState({
    productQuantity: "",
    giftType: ""
  });

  const giftWrapResponse = useSelector(
    state => state.giftWrap[giftWrapAction.GET_ALL_GIFT_WRAP]
  );

  // Fetch Data
  useEffect(() => {
    dispatch(giftWrapAction.getAllGiftWrap());
  }, [product._id]);

  const handleAddQuantity = () => {
    setCart(prevState => ({
      ...prevState,
      quantity: prevState.quantity + 1
    }));
  };

  const handleRemoveQuantity = () => {
    setCart(prevState => ({
      ...prevState,
      quantity: Math.abs(prevState.quantity - 1)
    }));
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleShowGiftOptions = e => {
    const isChecked = e.target.value === "1" ? true : false;
    setShowGiftOptions(isChecked);
  };

  const handleAddGiftOptions = e => {
    setCart(prevState => ({
      ...prevState,
      giftWrapId: e.target.value
    }));
    setErrors(state => ({
      ...state,
      giftType: ""
    }));
  };

  const handleAddToCart = () => {
    if (showGiftOptions && cart.giftWrapId === null) {
      setErrors(state => ({
        ...state,
        giftType: "Please select a gift wrap plan"
      }));
      return;
    }

    if (
      product.isMinOrderQuantityRequired &&
      cart.quantity < product.customQuantity
    ) {
      setErrors(state => ({
        ...state,
        productQuantity: `Minimum quantity to order this product is ${product.customQuantity}`
      }));
      return;
    }

    dispatch(
      cartAction.addProductToCart({
        product_id: cart.product._id,
        quantity: cart.quantity,
        gift_wrapping_required: showGiftOptions,
        gift_wrapping_id: cart.giftWrapId
      })
    );
    setErrors("");
    setShowModal(false);
  };

  return (
    <Modal
      isOpen={showModal}
      onRequestClose={toggleModal}
      contentLabel="Gift Wrap"
      style={{
        content: {
          width: "25rem",
          height: "25rem",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)"
        }
      }}
    >
      {/* Add Quantity */}
      <label htmlFor="">Mention Quantity</label>
      <div className="modal-add-quantity">
        <button
          onClick={handleRemoveQuantity}
          type="button"
          class="btn btn-dark btn-sm"
        >
          -
        </button>
        <input type="number" name="" value={cart?.quantity || 1} />
        <button
          onClick={handleAddQuantity}
          type="button"
          class="btn btn-dark btn-sm"
        >
          +
        </button>
      </div>
      {errors.productQuantity && (
        <div className="text-danger">{errors.productQuantity}</div>
      )}

      {/* Gift Wrap */}
      {product.showProductCustomizationPrompt && (
        <div className="modal-gift-wrap mt-5">
          <div>Do you want to gift wrap this item?</div>
          <div className="my-3">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
                data-show-gift-wrap={false}
                value="1"
                checked={showGiftOptions}
                onClick={handleShowGiftOptions}
              />
              <label className="form-check-label" for="flexRadioDefault1">
                Yes, I want to gift wrap this item
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
                data-show-gift-wrap={false}
                value="0"
                checked={!showGiftOptions}
                onClick={handleShowGiftOptions}
              />
              <label className="form-check-label" for="flexRadioDefault2">
                No, I dont want to gift wrap this item
              </label>
            </div>
          </div>
          {/* Choose Plan */}
          {showGiftOptions && (
            <div className="my-2">
              <select
                onChange={handleAddGiftOptions}
                class="form-select"
                aria-label="Default select example"
                value={cart.giftWrapId}
              >
                <option selected disabled>
                  Choose Plan
                </option>

                {giftWrapResponse?.map(giftWrap => (
                  <option
                    data-name={giftWrap.name}
                    data-price={giftWrap.price}
                    value={giftWrap._id}
                  >
                    {giftWrap.name} (${giftWrap.price})
                  </option>
                ))}
              </select>
              {errors.giftType && (
                <div className="text-danger">{errors.giftType}</div>
              )}
            </div>
          )}
        </div>
      )}

      <div className="modal-footer mt-5">
        <button className="btn btn-danger" onClick={toggleModal}>
          Cancel
        </button>
        <button className="btn btn-success" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </Modal>
  );
}

export default ProductGiftWrapModal;
