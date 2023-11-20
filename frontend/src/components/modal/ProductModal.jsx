import { Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";

import DropDownInput from "../combobox";
import { XCircleIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { ButtonLoader } from "../loader";
import { useSelector } from "react-redux";
import { truncateText } from "../../utils/helper";
import { ErrorNotification } from "../notification";

export default function AddProductModal({
  open,
  setOpen,
  handleModalClose,
  image,
  handleImage,
  removeImage,
  handleAdd,
  product,
  setProduct,
  handleSubmit,
  handleAddCategory,
  handleUpdateProduct,
  handleProductDelete,
  errors,
}) {
  const { categories, deleteLoading, loading, isEdit } = useSelector(
    (state) => state.product
  );

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full sm:p-6">
              <div className="flex justify-between align-center mb-3 ">
                <h3 className="font-bold">
                  {isEdit ? "Update" : "New"} Product
                </h3>
                <button onClick={handleModalClose}>
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>
              <div className="sm:grid sm:grid-cols-2 gap-2">
                <div className="col-span-2">
                  {errors ? (
                    <ErrorNotification message="Mandatory fields cannot be blank" />
                  ) : null}
                </div>
                <div className="mb-6 col-span-2">
                  <label
                    htmlFor="cover-photo"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Product Image
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <div className="max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        {!image ? (
                          <>
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
                                className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none "
                              >
                                <span>Upload a file</span>
                                <input
                                  id="file-upload"
                                  name="file-upload"
                                  type="file"
                                  className="sr-only"
                                  onChange={handleImage}
                                  // value={product.image}
                                />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">
                              PNG, JPG, GIF up to 10MB
                            </p>
                          </>
                        ) : (
                          <div className="flex justify-between align-center gap-2">
                            <p className="text-xs text-gray-500 m-0">
                              {truncateText(image.name, 50)}
                            </p>
                            <XCircleIcon
                              className="w-5 h-5 text-red-400"
                              onClick={removeImage}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="product-input"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white asterisks"
                  >
                    Product Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    onChange={handleAdd}
                    value={product.name}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <div className="mb-6">
                  <div>
                    <label
                      htmlFor="price"
                      className="mb-2 block text-sm font-medium text-gray-700 asterisks"
                    >
                      Price
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">₹</span>
                      </div>
                      <input
                        type="text"
                        name="price"
                        id="price"
                        onChange={handleAdd}
                        value={product.price}
                        className=" pl-7 pr-12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-6 col-span-2">
                  <label
                    htmlFor="comment"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Product Description
                  </label>
                  <div className="mt-1">
                    <textarea
                      rows={4}
                      name="description"
                      id="description"
                      onChange={handleAdd}
                      value={product.description}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
                    />
                  </div>
                </div>
                <div className="mb-6 col-span-2">
                  <DropDownInput
                    label="category"
                    text="Category"
                    data={categories}
                    product={product}
                    setProduct={setProduct}
                    handleAddCategory={handleAddCategory}
                  />
                </div>
                <div className="text-end col-span-2">
                  {isEdit && (
                    <button
                      type="button"
                      onClick={() => handleProductDelete(product._id)}
                      className="inline-flex items-center px-4 py-2 border hover:border-red-500 rounded-md shadow-sm text-sm font-medium text-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-red-500 mr-2"
                    >
                      {deleteLoading ? <ButtonLoader /> : null}
                      Delete Product
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={isEdit ? handleUpdateProduct : handleSubmit}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
                  >
                    {loading ? <ButtonLoader /> : null}
                    {isEdit ? "Update" : "Add"} Product
                  </button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
