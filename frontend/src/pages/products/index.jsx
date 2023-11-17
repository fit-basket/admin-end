// import BreadCrumb from "../../components/breadcrumb";

import { useState } from "react";
import { useSelector } from "react-redux";

import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

import { PageHeading } from "../../components/headings";
import Category from "./Category";
import ProductModal from "../../components/modal/ProductModal";
import axios from "../../utils/axiosConfig";

// const crumbs = [
//   { name: "Burger", href: "#", current: false },
//   { name: "Project Nero", href: "#", current: true },
// ];

export default function Product() {
  // variables and states
  const { currentUser } = useSelector((state) => state.user);

  const [open, setOpen] = useState(false);
  const [productLoading, setProductLoading] = useState(false);
  const [image, setImage] = useState("");
  const initialState = {
    name: "",
    description: "",
    image: "",
    price: "",
    businessId: currentUser._id,
    category: "Burger",
    subCategory: "",
    businessType: currentUser.type,
  };

  const [product, setProduct] = useState(initialState);

  // func
  const handleModal = () => {
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

  const uploadImage = async () => {
    if (!image) return Promise.resolve(); // No image to upload, resolve immediately

    const imageRef = ref(storage, `product/${product.name + v4()}`);
    return await uploadBytes(imageRef, image).then(() => {
      return getDownloadURL(imageRef); // Return the download URL after upload completes
    });
  };

  const handleProductSubmit = (e) => {
    e.preventDefault();
    setProductLoading(true);
    uploadImage()
      .then((downloadURL) => {
        if (downloadURL) {
          setProduct((prevProduct) => ({
            ...prevProduct,
            image: downloadURL,
          }));
        } else {
          console.log("No image uploaded!");
        }
      })
      .then(() =>
        axios
          .post("/create-product", { ...product })
          .then((res) => {
            if (res.data.success) {
              console.log("RESPONSE", res);
              //   navigate("/");
            } else {
              console.log("ERROR");
            }
            setProduct(initialState);
            setProductLoading(false);
            setOpen(false);
          })
          .catch((error) => {
            setProductLoading(false);
            console.log("ERROR", error);
          })
      )
      .catch((error) => {
        setProductLoading(false);
        console.error("Error uploading image:", error);
      });
  };

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
            onClick={handleModal}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
          >
            Add Products
          </button>
        </div>
      </div>
      <Category />
      <ProductModal
        open={open}
        setOpen={setOpen}
        // modalItem={dummyData}
        handleAdd={handleAddProduct}
        handleSubmit={handleProductSubmit}
        handleImage={handleImage}
        product={product}
        isLoading={productLoading}
        image={image}
        removeImage={removeImage}
      />
    </div>
  );
}
