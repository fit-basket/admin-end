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
  deleteProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  getCategoriesFailure,
  getCategoriesStart,
  getCategoriesSuccess,
  setModalOpen,
  updateProductFailure,
  updateProductStart,
  updateProductSuccess,
} from "../../redux/product/productSlice";
import { ProductModal } from "../../components/modal";

export default function Product() {
  // variables and states
  const { currentUser } = useSelector((state) => state.user);
  const { selectedProduct } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const initialProduct = {
    name: "",
    description: "",
    // image: "",
    price: "",
    businessId: currentUser._id,
    category: "",
    subCategory: "",
    businessType: currentUser.businessType,
  };

  const initialCategory = {
    title: "",
    // image: "",
    businessId: currentUser._id,
  };

  const [open, setOpen] = useState(false);
  const [image, setImage] = useState("");
  const [isImageChanged, setIsImageChange] = useState(false);

  const [product, setProduct] = useState(initialProduct);
  const [errors, setErrors] = useState(false);
  // const [productId, setProductId] = useState("");
  // const [category, setCategory] = useState(initialCategory);

  // func

  const handleGetProduct = (productId) => {
    // setProductId(productId);
    setErrors(false);
    if (productId) {
      axios
        .get(`/products/single-product/${productId}`)
        .then((res) => {
          // console.log("PRODUCT", res.data.data);
          const product = res.data.data;
          setProduct((prevProduct) => ({
            ...prevProduct,
            _id: product._id,
            name: product.name,
            price: product.price,
            description: product.description,
            category: product.category,
          }));
          setImage({ name: product.image });
        })
        .catch((err) => {
          console.log("ERR", err);
        });
    }
  };

  const handleModalOpen = (isEdit, productId = "") => {
    dispatch(setModalOpen(isEdit));
    setOpen(true);
    handleGetProduct(productId);
  };

  const handleModalClose = () => {
    setOpen(false);
    setErrors(false);
    setProduct(initialProduct);
    setImage("");
  };

  const handleAddProduct = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
    setErrors(false);
  };

  const handleImage = (e) => {
    setImage(e.target.files[0]);
    setIsImageChange(true);
  };

  const removeImage = () => {
    setImage("");
  };

  // Handle Product fields validation
  const handleValidation = () => {
    if (
      product.name.trim() === "" ||
      product.category.trim() === "" ||
      product.price.trim() === ""
    ) {
      setErrors(true);
      return false;
    } else {
      return true;
    }
  };

  // Handle Image upload to firebase
  const uploadImage = async () => {
    if (!image) return Promise.resolve();
    if (isImageChanged) {
      const imageRef = ref(storage, `product/${product.name + v4()}`);
      return await uploadBytes(imageRef, image).then(() => {
        return getDownloadURL(imageRef); // Return the download URL after upload completes
      });
    } else {
      return undefined;
    }
    // Upload the image to Firebase Storage
  };

  // Add new category
  const handleAddCategory = (title) => {
    axios
      .post("/add-category", { ...initialCategory, title })
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

  // Handle Edit product
  const handleUpdateProduct = async () => {
    if (handleValidation()) {
      setErrors(false);

      dispatch(updateProductStart());
      try {
        const downloadURL = await uploadImage(); // Get the imageUrl before uploading product data

        if (downloadURL) {
          const response = await axios.patch(`/products/${product._id}`, {
            ...product,
            image: downloadURL,
          });

          if (response.data.success) {
            console.log("Product created successfully:", response);
          } else {
            console.log("Failed to create product");
          }
        } else {
          const response = await axios.patch(`/products/${product._id}`, {
            ...product,
          });
          if (response.data.success) {
            console.log("Product created successfully:", response);
          } else {
            console.log("Failed to create product");
          }
        }

        setProduct(initialProduct);
        setIsImageChange(false);
        setImage("");

        dispatch(updateProductSuccess());

        setOpen(false);
      } catch (error) {
        dispatch(updateProductFailure());
        console.error("Error submitting product:", error);
      }
    }
  };

  // Create new product
  const handleProductSubmit = async (e) => {
    if (handleValidation()) {
      e.preventDefault();
      setErrors(false);

      dispatch(addProductStart());
      try {
        const downloadURL = await uploadImage(); // Get the imageUrl before uploading product data

        if (downloadURL) {
          const response = await axios.post("/products/create-product", {
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
        setIsImageChange(false);
        setImage("");

        dispatch(addProductSuccess());

        setOpen(false);
      } catch (error) {
        dispatch(addProductFailure());
        console.error("Error submitting product:", error);
      }
    }
  };

  const handleProductDelete = async (productId) => {
    dispatch(deleteProductStart());
    try {
      const response = await axios.delete(`/products/${productId}`);

      if (response.data.success) {
        console.log("Product created successfully:", response);
      } else {
        console.log("Failed to create product");
      }

      dispatch(deleteProductSuccess());

      setOpen(false);
    } catch (error) {
      dispatch(deleteProductFailure());
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
            onClick={() => handleModalOpen(false)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
          >
            Add Products
          </button>
        </div>
      </div>
      <Category handleModal={handleModalOpen} />
      <ProductModal
        open={open}
        setOpen={setOpen}
        handleModalClose={handleModalClose}
        image={image}
        handleImage={handleImage}
        removeImage={removeImage}
        handleAdd={handleAddProduct}
        product={product}
        setProduct={setProduct}
        handleSubmit={handleProductSubmit}
        handleAddCategory={handleAddCategory}
        handleUpdateProduct={handleUpdateProduct}
        handleProductDelete={handleProductDelete}
        errors={errors}
      />
    </div>
  );
}
