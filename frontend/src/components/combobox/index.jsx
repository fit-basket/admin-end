import { useEffect, useState } from "react";
// import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
// import { Combobox } from "@headlessui/react";
// import { CheckIcon } from "@heroicons/react/24/solid";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";

import "./style.css";
import { useSelector } from "react-redux";

export default function DropDownInput({
  label,
  text,
  data,
  product,
  setProduct,
  handleAddCategory,
}) {
  // state and variables

  const { selectedCategory, categories } = useSelector(
    (state) => state.product
  );

  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);

  const handleQuery = (e) => {
    setOpen(true);
    setQuery(e.target.value);
    const filteredData =
      e.target.value === ""
        ? data
        : data?.filter((category) => {
            return category.title.toLowerCase().includes(query.toLowerCase());
          });

    setOptions(filteredData);
  };

  const handleData = (value) => {
    setOpen(false);
    setQuery(value.title);
    setProduct({ ...product, [label]: value._id });
  };

  const isExactMatch = options?.some(
    (category) => category.title.toLowerCase() === query.toLowerCase()
  );

  const handleNewCategory = (query) => {
    setOpen(false);
    handleAddCategory(query);
  };

  useEffect(() => {
    let category = categories?.find(
      (category) => category?._id === selectedCategory
    );

    setQuery(category?.title || "");
  }, [categories, selectedCategory]);

  return (
    <div>
      <label
        htmlFor={text}
        className="mb-2 block text-sm font-medium text-gray-700 asterisks"
      >
        {text}
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        <input
          type="text"
          name={label}
          id={text}
          value={query}
          onChange={handleQuery}
          autoComplete="off"
          className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <ChevronUpDownIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </div>
      </div>
      {open && query.length > 0 && (
        <div className="mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          <>
            <div className="max-h-24 overflow-auto">
              {options?.length > 0 &&
                options?.map((category) => (
                  <div
                    key={category._id}
                    className="text-gray-900 cursor-default select-none py-2 pl-3 pr-9 hover:bg-indigo-600 hover:text-white"
                    onClick={() => handleData(category)}
                  >
                    {category.title}
                  </div>
                ))}
            </div>

            {query.length > 0 && !isExactMatch && (
              <div className="mt-1 max-h-56 w-full overflow-auto  bg-gray-100 text-basesm:text-sm">
                <div
                  className="relative flex flex-wrap justify-between cursor-pointer select-none py-2 px-3 text-gray-900 hover:bg-indigo-600 hover:text-white"
                  onClick={() => handleNewCategory(query)}
                >
                  <p>Add new {label}</p>
                  <PlusCircleIcon className="w-5 h-5" />
                </div>
              </div>
            )}
          </>
        </div>
      )}
    </div>
  );
}
