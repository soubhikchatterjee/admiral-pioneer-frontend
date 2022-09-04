import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Custom Components
import { ProductList, Alert } from "components/components";
import * as productsAction from "store/products/products.action";

function ProductListingContainer() {
  const dispatch = useDispatch();
  const addProductResponse = useSelector(
    state => state.products[productsAction.ADD_PRODUCT]
  );

  // On successful redirection, show alert msg
  useEffect(() => {
    if (addProductResponse?.status === 201) {
      setTimeout(() => {
        dispatch(productsAction.reset(productsAction.ADD_PRODUCT));
      }, 3000);
    }
  }, [addProductResponse]);

  return (
    <>
      {addProductResponse && (
        <Alert message={addProductResponse?.data?.message} />
      )}
      <ProductList />

      {addProductResponse && (
        <Alert message={addProductResponse?.data?.message} />
      )}
    </>
  );
}

export default ProductListingContainer;
