import { SectionHeading } from "../../components/headings";
import SquareList from "../../components/grid-list/SquareList";
import ProductCard from "../../components/grid-list/ProductList";
import { useSelector } from "react-redux";

function Category({ handleModal, getProductbyCategory, getAllProduct }) {
  // state and variables
  const { categories, products } = useSelector((state) => state.product);

  // async

  return (
    <div>
      <SectionHeading title="Category" />
      <SquareList list={categories} />
      <ProductCard products={products} handleModal={handleModal} />
    </div>
  );
}

export default Category;
