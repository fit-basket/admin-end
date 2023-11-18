import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

import { PageHeading } from "../../components/headings";
import Category from "./Category";
// import ProductModal from "../../components/modal";
import axios from "../../utils/axiosConfig";
import {
  addProductFailure,
  addProductStart,
  addProductSuccess,
  getCategoriesFailure,
  getCategoriesStart,
  getCategoriesSuccess,
  setModalOpen,
} from "../../redux/product/productSlice";
import { ProductModal } from "../../components/modal";

export default function Product() {
  // variables and states
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const initialProduct = {
    name: "",
    description: "",
    image: "",
    price: "",
    businessId: currentUser._id,
    category: "",
    subCategory: "",
    businessType: currentUser.businessType,
  };

  const initialCategory = {
    title: "",
    image: "",
    businessId: currentUser._id,
  };

  const [open, setOpen] = useState(false);
  const [image, setImage] = useState("");

  const [product, setProduct] = useState(initialProduct);
  const [category, setCategory] = useState(initialCategory);

  // func
  const handleModal = (isEdit) => {
    dispatch(setModalOpen(isEdit));
    setOpen(true);
  };

  const handleAddProduct = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const removeImage = () => {
    setImage("");
  };

  // Handle Image upload to firebase
  const uploadImage = async () => {
    if (!image) return Promise.resolve();

    // Upload the image to Firebase Storage
    const imageRef = ref(storage, `product/${product.name + v4()}`);
    return await uploadBytes(imageRef, image).then(() => {
      return getDownloadURL(imageRef); // Return the download URL after upload completes
    });
  };

  // Add new category
  const handleAddCategory = (title) => {
    axios
      .post("/add-category", { ...category, title })
      .then((res) => {
        if (res.data.success) {
          const id = res.data.data._id;
          setProduct((prevProduct) => ({
            ...prevProduct,
            category: id,
          }));
        } else {
          console.log("ERROR");
        }
      })
      .catch((error) => {
        console.log("ERROR", error);
      });
  };

  // Create new product
  const handleProductSubmit = async (e) => {
    e.preventDefault();

    dispatch(addProductStart());
    try {
      const downloadURL = await uploadImage(); // Get the imageUrl before uploading product data

      if (downloadURL) {
        const response = await axios.post("/create-product", {
          ...product,
          image: downloadURL,
        });

        if (response.data.success) {
          console.log("Product created successfully:", response);
        } else {
          console.log("Failed to create product");
        }
      } else {
        console.log("No image uploaded!");
      }

      setProduct(initialProduct);

      setImage("");

      dispatch(addProductSuccess());

      setOpen(false);
    } catch (error) {
      dispatch(addProductFailure());
      console.error("Error submitting product:", error);
    }
  };

  // async
  useEffect(() => {
    if (currentUser) {
      dispatch(getCategoriesStart());
      axios
        .get(`/category?businessId=${currentUser._id}`)
        .then((res) => {
          dispatch(getCategoriesSuccess(res.data.data));
        })
        .catch((err) => {
          dispatch(getCategoriesFailure(err));
        });
    }
  }, [dispatch, currentUser]);

  return (
    <div>
      <div className="mt-2 flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <PageHeading title="Products" />
        </div>
        {/* <BreadCrumb title="Products" crumbs={crumbs} /> */}
        <div className="flex-shrink-0 flex ">
          <button
            type="button"
            onClick={() => handleModal(false)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
          >
            Add Products
          </button>
        </div>
      </div>
      <Category handleModal={handleModal} />
      <ProductModal
        open={open}
        setOpen={setOpen}
        image={image}
        handleImage={handleImage}
        removeImage={removeImage}
        handleAdd={handleAddProduct}
        product={product}
        setProduct={setProduct}
        handleSubmit={handleProductSubmit}
        handleAddCategory={handleAddCategory}
      />
    </div>
  );
}
