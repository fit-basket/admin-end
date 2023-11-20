import React from "react";
import { StarIcon } from "@heroicons/react/24/solid";

import { classNames, truncateText } from "../../utils/helper";

function ProductCard({ products, handleModal }) {
  return (
    <div>
      <ul className="mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products?.map(({ image, name, price, _id, rating, description }) => (
          <li
            key={_id}
            className="col-span-1 text-start p-2 shadow-sm border border-gray-200 bg-white rounded-md text-gray-500"
          >
            <div className="flex-1 flex items-start justify-between">
              <img
                src={image}
                alt={name}
                className="w-16 h-16 rounded-md object-center object-cover"
              />
              <div className="flex-1 px-4 py-2 text-sm text-start truncate">
                <div className="text-gray-900 font-medium hover:text-gray-600">
                  {truncateText(name, 15)}
                </div>
                <p className="text-gray-500 text-start">₹{price} </p>
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rate) => (
                    <StarIcon
                      key={rate}
                      className={classNames(
                        rating > rate ? "text-primary" : "text-gray-200",
                        "h-5 w-5 flex-shrink-0"
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
              </div>
              <div className="flex-shrink-0">
                <button
                  type="button"
                  onClick={() => handleModal(true, _id)}
                  className="w-8 h-8 bg-white inline-flex items-center justify-center text-gray-400 rounded-full bg-transparent hover:text-gray-500 "
                >
                  <span className="sr-only">Open options</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <p className="text-sm">{truncateText(description, 35)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductCard;
