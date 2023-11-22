import React from "react";
import { PageHeading } from "../../components/headings";

function Business() {
  return (
    <div>
      <div className="mt-2 flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <PageHeading title="Business" />
        </div>
        {/* <div className="flex-shrink-0 flex ">
          <button
            type="button"
            onClick={() => handleModalOpen(false)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
          >
            Add Products
          </button>
        </div> */}
      </div>
    </div>
  );
}

export default Business;
