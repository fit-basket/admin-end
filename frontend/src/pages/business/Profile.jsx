import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosConfig from "../../utils/axiosConfig";
import {
  updateBusinessFailure,
  updateBusinessStart,
  updateBusinessSuccess,
  updateErrorMessage,
  updateSuccessMessage,
} from "../../redux/user/userSlice";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase";
import { XCircleIcon } from "@heroicons/react/20/solid";
import { successNotifications } from "../../constants/successNotifications";
import { ButtonLoader } from "../../components/loader";

function Profile() {
  // misc
  const dispatch = useDispatch();
  const { currentUser, loading } = useSelector((state) => state.user);

  // variables and state
  const [businessData, setBusinessData] = useState(currentUser);
  const [image, setImage] = useState("");
  const [isImageChanged, setIsImageChange] = useState(false);
  const { businessSuccess } = successNotifications;

  // func
  const handleBusinessDataChange = (e) => {
    const { name, value } = e.target;
    setBusinessData({ ...businessData, [name]: value });
  };

  // <<########################### Image related functions ############################>>
  const uploadImage = async () => {
    // Handle Image upload to firebase storage
    if (!image) return Promise.resolve();
    if (isImageChanged) {
      const imageRef = ref(storage, `business/${businessData._id}`);
      return await uploadBytes(imageRef, image).then(() => {
        return getDownloadURL(imageRef); // Return the download URL after upload completes
      });
    } else {
      return undefined;
    }
  };

  const handleImageChange = (e) => {
    setIsImageChange(true);
    setImage(e.target.files[0]);
  };
  const handleImageRemove = () => {
    setBusinessData({ ...businessData, image: "" });
    setImage("");
    setIsImageChange(false);
  };

  // <<########################### Image related functions end ############################>>

  // <<########################### Error and Success messages ############################>>

  const handleSuccess = (message) => {
    dispatch(updateSuccessMessage({ data: message }));
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      dispatch(updateSuccessMessage({ data: "" }));
    }, 3000);
  };

  const handleError = (err) => {
    dispatch(updateErrorMessage(err));
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      dispatch(updateSuccessMessage({ data: "" }));
    }, 3000);
  };

  // <<########################### Error and Success messages end ############################>>

  // <<###########################  Handle Submit Business Data ############################>>

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateBusinessStart());
    try {
      const downloadURL = await uploadImage(); // Get the imageUrl before uploading product data

      if (downloadURL) {
        axiosConfig
          .patch("/business/update-business", {
            ...businessData,
            image: downloadURL,
          })
          .then((res) => {
            setBusinessData(res.data.data);
            dispatch(updateBusinessSuccess(res.data));
            handleSuccess(businessSuccess);
          })
          .catch((err) => {
            dispatch(updateBusinessFailure(err));
            handleError(err);
          });
      } else {
        axiosConfig
          .patch("/business/update-business", { ...businessData })
          .then((res) => {
            setBusinessData(res.data.data);
            dispatch(updateBusinessSuccess(res.data));
            handleSuccess(businessSuccess);
          })
          .catch((err) => {
            dispatch(updateBusinessFailure(err));
            handleError(err);
          });
      }
      setIsImageChange(false);
    } catch (error) {
      console.error("Error submitting Business data:", error);
    }
  };

  return (
    <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9 text-start">
      <form action="#" method="POST" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-6">
          <div className="col-span-1">
            <label
              htmlFor="businessName"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white asterisks"
            >
              Business Name
            </label>
            <input
              type="text"
              id="businessName"
              name="businessName"
              onChange={handleBusinessDataChange}
              value={businessData.businessName}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          <div className="col-span-1">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white asterisks"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              onChange={handleBusinessDataChange}
              value={businessData.email}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="col-span-1">
            <label
              htmlFor="phone"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white asterisks"
            >
              Phone
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              onChange={handleBusinessDataChange}
              value={businessData.phone}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="col-span-1">
            <label
              htmlFor="address"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white asterisks"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              onChange={handleBusinessDataChange}
              value={businessData.address}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Cover photo
            </label>
            <div className="mt-1 border-2 border-gray-300 border-dashed rounded-md px-6 pt-5 pb-6 flex justify-center">
              {!isImageChanged ? (
                businessData.image === "" ? (
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          onChange={handleImageChange}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                ) : (
                  <div className="relative">
                    <img
                      src={businessData.image}
                      alt={businessData.businessName}
                    />
                    <XCircleIcon
                      className="w-5 h-5 text-red-400 absolute -top-3 -right-3 cursor-pointer"
                      onClick={handleImageRemove}
                    />
                  </div>
                )
              ) : (
                <div className="flex items-center gap-2">
                  <div>{image.name}</div>
                  <XCircleIcon
                    className="w-5 h-5 text-red-400 cursor-pointer"
                    onClick={handleImageRemove}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <button
            type="submit"
            className="flex items-center bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {loading ? <ButtonLoader /> : null}
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default Profile;
