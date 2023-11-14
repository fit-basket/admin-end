import React from "react";

function SquareList({ list }) {
  return (
    <div className="">
      <div className="max-w-7xl mx-auto py-4 overflow-x-auto scrollbar-hide flex gap-10 mb-10">
        {/* <div className="grid grid-cols-2 gap-8 md:grid-cols-6 lg:grid-cols-5"> */}
        {list.map(({ src, category, id }) => {
          return (
            <div
              className="col-span-1 flex flex-col justify-start md:col-span-2 lg:col-span-1 cursor-pointer"
              key={id}
            >
              <img
                src={src}
                alt={category}
                className="flex-none w-24 h-24 bg-gray-100 rounded-md object-center object-cover"
              />
              <p className="w-24 mt-2">{category}</p>
            </div>
          );
        })}
        {/* </div> */}
      </div>
    </div>
  );
}

export default SquareList;
