// import BreadCrumb from "../../components/breadcrumb";

import { PageHeading } from "../../components/headings";
import Category from "./Category";

// const crumbs = [
//   { name: "Burger", href: "#", current: false },
//   { name: "Project Nero", href: "#", current: true },
// ];

export default function Product() {
  return (
    <div>
      <div className="mt-2 flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <PageHeading title="Products" />
        </div>
        {/* <BreadCrumb title="Products" crumbs={crumbs} /> */}
        <div className="flex-shrink-0 flex ">
          {/* <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
          >
            Edit
          </button> */}
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
          >
            Add Products
          </button>
        </div>
      </div>
      <Category />
    </div>
  );
}
