import React, { useState } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";

function ProductItem({ product }) {
  const [showModal, setShowModal] = useState(false);
  const [showGiftOptions, setShowGiftOptions] = useState(false);

  function toggleModal() {
    setShowModal(!showModal);
  }
  return (
    <>
      <div className="col mb-5">
        <div className="card h-100">
          {/* <!-- Product image--> */}
          <img
            className="card-img-top"
            src={
              product.imageUrl ||
              "https://dummyimage.com/450x300/dee2e6/6c757d.jpg"
            }
            alt={product.name}
          />
          {/* <!-- Product details--> */}
          <div className="card-body p-4">
            <div className="text-center">
              {/* <!-- Product name--> */}
              <h5 className="fw-bolder">{product.name}</h5>
              {/* <!-- Product price--> */}${product.price}
            </div>
          </div>
          {/* <!-- Product actions--> */}
          <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
            <div className="text-center">
              <button
                data-bs-toggle="modal"
                data-bs-target="#giftModal"
                className="btn btn-outline-dark mt-auto"
                onClick={() => {
                  setShowModal(!showModal);
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={showModal}
        onRequestClose={toggleModal}
        contentLabel="Gift Wrap"
        style={{
          content: {
            width: "20rem",
            height: "20rem",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)"
          }
        }}
      >
        <div>Do you want to gift wrap this item?</div>
        <div className="my-3">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
              onClick={() => {
                setShowGiftOptions(true);
              }}
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
              checked
              onClick={() => {
                setShowGiftOptions(false);
              }}
            />
            <label className="form-check-label" for="flexRadioDefault2">
              No, I dont want to gift wrap this item
            </label>
          </div>
        </div>
        {/* Choose Plan */}
        {showGiftOptions && (
          <div className="my-2">
            <select class="form-select" aria-label="Default select example">
              <option selected disabled>
                Choose Plan
              </option>
              <option value="standard">Standard ($5)</option>
              <option value="premium">Premium ($20)</option>
            </select>
          </div>
        )}

        <div className="row justify-content-between mt-5">
          <div className="col mx-3">
            <button className="btn btn-danger" onClick={toggleModal}>
              Cancel
            </button>
            <button className="btn btn-success" onClick={toggleModal}>
              Add to Cart
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

ProductItem.propType = {
  product: PropTypes.object.isRequired
};

export default ProductItem;
