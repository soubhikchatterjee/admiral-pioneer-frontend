import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Custom Components
import * as productsAction from "store/products/products.action";
import { ErrorLabel } from "components/components";

function ProductAdd() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const minQuantityRef = useRef();
  const taxApplicableRef = useRef();

  const [postData, setPostData] = useState({
    name: "",
    image_url: "",
    product_type: "virtual",
    is_min_order_qty_required: false,
    show_product_customization_prompt: false,
    price: 0,
    custom_quantity: 0,
    taxId: null,
    tax_percentage: 5
  });

  const addProductResponse = useSelector(
    state => state.products[productsAction.ADD_PRODUCT]
  );
  const addProductErrors = useSelector(
    state => state.products[productsAction.ADD_PRODUCT_ERROR]
  );

  // On successful submission, redirect to homepage
  useEffect(() => {
    if (addProductResponse?.status === 201) {
      navigate("/");
    }
  }, [addProductResponse]);

  const handleProductAdd = () => {
    dispatch(productsAction.addProduct(postData));
  };

  return (
    <>
      <section className="py-5">
        <div className="container px-4 px-lg-5 mt-5">
          {/* Name */}
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              onChange={e => {
                setPostData(prevState => ({
                  ...prevState,
                  [e.target.name]: e.target.value
                }));
              }}
            />
            <ErrorLabel field="name" errors={addProductErrors} />
          </div>

          {/* Image Url */}
          <div className="mb-3">
            <label htmlFor="image" className="form-label">
              Image Url
            </label>
            <input
              type="text"
              className="form-control"
              id="image_url"
              name="image_url"
              onChange={e => {
                setPostData(prevState => ({
                  ...prevState,
                  [e.target.name]: e.target.value
                }));
              }}
            />
            <ErrorLabel field="image_url" errors={addProductErrors} />
          </div>

          {/* Product Type */}
          <div className="mb-3">
            <label htmlFor="product_type" className="form-label">
              Product Type
            </label>
            <select
              name="product_type"
              onChange={e => {
                setPostData(prevState => ({
                  ...prevState,
                  [e.target.name]: e.target.value
                }));
              }}
              className="form-select"
              aria-label="Default select example"
            >
              {/* <option selected>Product Type</option> */}
              <option value="physical">Physical</option>
              <option value="virtual">Virtual</option>
            </select>
            <ErrorLabel field="product_type" errors={addProductErrors} />
          </div>

          {/* Price */}
          <div className="mb-3">
            <label htmlFor="price" className="form-label">
              Price
            </label>
            <input
              type="number"
              className="form-control"
              id="price"
              name="price"
              onChange={e => {
                setPostData(prevState => ({
                  ...prevState,
                  [e.target.name]: e.target.value
                }));
              }}
            />
            <ErrorLabel field="price" errors={addProductErrors} />
          </div>

          {/* Show product customizaton */}
          <div className="mb-3">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="show_product_customization_prompt"
                name="show_product_customization_prompt"
                onChange={e => {
                  setPostData(prevState => ({
                    ...prevState,
                    [e.target.name]: e.target.checked
                  }));
                }}
              />
              <label
                className="form-check-label"
                htmlFor="show_product_customization_prompt"
              >
                Show Product Customization
              </label>
              <ErrorLabel
                field="show_product_customization_prompt"
                errors={addProductErrors}
              />
            </div>
          </div>

          {/* Min Quantity */}
          <div className="mb-3">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="is_min_order_qty_required"
                name="is_min_order_qty_required"
                onChange={e => {
                  minQuantityRef.current = e.target.checked;
                  setPostData(prevState => ({
                    ...prevState,
                    [e.target.name]: e.target.checked
                  }));
                }}
              />
              <label
                className="form-check-label"
                htmlFor="is_min_order_qty_required"
              >
                Is Minimum Order Quantity Required?
              </label>
              <ErrorLabel
                field="is_min_order_qty_required"
                errors={addProductErrors}
              />
            </div>
          </div>

          {/* Custom Quantity */}
          {minQuantityRef.current && (
            <div className="mb-3">
              <label htmlFor="custom_quantity" className="form-label">
                Custom Quantity
              </label>
              <input
                type="number"
                className="form-control"
                id="custom_quantity"
                name="custom_quantity"
                onChange={e => {
                  setPostData(prevState => ({
                    ...prevState,
                    [e.target.name]: e.target.value
                  }));
                }}
              />
              <ErrorLabel field="custom_quantity" errors={addProductErrors} />
            </div>
          )}

          {/* Tax Applicable */}
          <div className="mb-3">
            <label htmlFor="taxId" className="form-label">
              Tax Applicable
            </label>
            <select
              name="taxId"
              onChange={e => {
                taxApplicableRef.current = e.target.value;
                setPostData(prevState => ({
                  ...prevState,
                  [e.target.name]: e.target.value
                }));
              }}
              className="form-select"
              aria-label="Default select example"
            >
              <option value="standard">Standard</option>
              <option value="custom">Custom</option>
            </select>
            <ErrorLabel field="taxId" errors={addProductErrors} />
          </div>

          {/* Tax Percentage */}
          {taxApplicableRef.current === "custom" && (
            <div className="mb-3">
              <label htmlFor="tax_percentage" className="form-label">
                Custom Tax (percentage)
              </label>
              <input
                type="number"
                className="form-control"
                id="tax_percentage"
                name="tax_percentage"
                onChange={e => {
                  setPostData(prevState => ({
                    ...prevState,
                    [e.target.name]: e.target.value
                  }));
                }}
              />
              <ErrorLabel field="tax_percentage" errors={addProductErrors} />
            </div>
          )}

          {/* Submit Button */}
          <div className="mb-3">
            <button
              onClick={handleProductAdd}
              type="button"
              className="btn btn-success"
            >
              Add Product
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default ProductAdd;
