import React, { useEffect } from "react";

import { SectionHeading } from "../../components/headings";
import SquareList from "../../components/grid-list/SquareList";
import ProductCard from "../../components/grid-list/ProductList";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../utils/axiosConfig";
import {
  getProductFailure,
  getProductStart,
  getProductSuccess,
} from "../../redux/product/productSlice";

function Category({ handleModal }) {
  // state and variables
  const dispatch = useDispatch();
  const { categories, selectedCategory, products } = useSelector(
    (state) => state.product
  );

  const { currentUser } = useSelector((state) => state.user);

  // async

  useEffect(() => {
    if (selectedCategory) {
      dispatch(getProductStart());
      axios
        .get(
          `/products/all-products/${currentUser._id}?categoryId=${selectedCategory}`
        )
        .then((res) => {
          dispatch(getProductSuccess(res.data.data));
        })
        .catch((err) => {
          dispatch(getProductFailure(err));
        });
    }
  }, [selectedCategory, dispatch, currentUser]);

  return (
    <div>
      <SectionHeading title="Category" />
      <SquareList list={categories} />
      <ProductCard products={products} handleModal={handleModal} />
    </div>
  );
}

export default Category;
