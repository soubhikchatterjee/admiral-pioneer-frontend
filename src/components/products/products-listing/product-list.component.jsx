import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Custom Components
import * as productsAction from "store/products/products.action";
import { ProductItem } from "components/components";

function ProductList() {
  const dispatch = useDispatch();

  const allProductsResponse = useSelector(
    (state) => state.products[productsAction.GET_ALL_PRODUCTS]
  );

  const [parameters, setParameters] = useState({
    page: 1,
  });

  useEffect(() => {
    dispatch(productsAction.getAllProducts());
  }, []);

  return (
    <section className="py-5">
      <div className="container px-4 px-lg-5 mt-5">
        <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
          {allProductsResponse?.map((product) => (
            <ProductItem key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductList;
