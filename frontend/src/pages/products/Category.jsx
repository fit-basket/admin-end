import React, { useEffect } from "react";

import { SectionHeading } from "../../components/headings";
import SquareList from "../../components/grid-list/SquareList";
import ProductCard from "../../components/grid-list/ProductList";
import { useSelector } from "react-redux";

function Category({ handleModal, getProductbyCategory, getAllProduct }) {
  // state and variables
  const { categories, selectedCategory, products } = useSelector(
    (state) => state.product
  );

  const { currentUser } = useSelector((state) => state.user);

  // async
  useEffect(() => {
    if (selectedCategory) {
      getProductbyCategory();
    } else {
      getAllProduct();
    }
  }, [selectedCategory, currentUser]);

  return (
    <div>
      <SectionHeading title="Category" />
      <SquareList list={categories} />
      <ProductCard products={products} handleModal={handleModal} />
    </div>
  );
}

export default Category;
