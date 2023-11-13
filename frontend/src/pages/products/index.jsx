// import BreadCrumb from "../../components/breadcrumb";

// const crumbs = [
//   { name: "Burger", href: "#", current: false },
//   { name: "Project Nero", href: "#", current: true },
// ];

export default function Product() {
  return (
    <div>
      <div className="mt-2 md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-base font-bold leading-7 text-start sm:text-base sm:truncate">
            Products
          </h2>
        </div>
        {/* <BreadCrumb title="Products" crumbs={crumbs} /> */}
        <div className="mt-4 flex-shrink-0 flex md:mt-0 md:ml-4">
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
    </div>
  );
}
