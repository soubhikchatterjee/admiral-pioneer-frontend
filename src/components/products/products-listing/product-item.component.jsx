import React, { useState } from "react";
import PropTypes from "prop-types";

// Custom Components
import ProductModal from "./product-modal/product-modal.component";

function ProductItem({ product }) {
  const [showModal, setShowModal] = useState(false);
  const [showGiftOptions, setShowGiftOptions] = useState(false);

  const handleAddToCart = () => {
    setShowModal(!showModal);
  };

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
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Modal */}
      {showModal && (
        <ProductModal
          product={product}
          showGiftOptions={showGiftOptions}
          setShowGiftOptions={setShowGiftOptions}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
    </>
  );
}

ProductItem.propType = {
  product: PropTypes.object.isRequired
};

export default ProductItem;
