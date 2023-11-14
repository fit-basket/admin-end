import React from "react";

import { SectionHeading } from "../../components/headings";
import SquareList from "../../components/grid-list/SquareList";
import { categories } from "../../constants/dummy/category";
import ProductCard from "../../components/grid-list/ProductList";
import { cakeList } from "../../constants/dummy/product";

function Category() {
  return (
    <div>
      <SectionHeading title="Category" />
      <SquareList list={categories} />
      <ProductCard products={cakeList} />
    </div>
  );
}

export default Category;
