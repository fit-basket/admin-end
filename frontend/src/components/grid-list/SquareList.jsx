import React from "react";
import { useDispatch } from "react-redux";
import { setCategory } from "../../redux/product/productSlice";

function SquareList({ list }) {
  // state asnd variables
  const dispatch = useDispatch();

  // func
  const handleCategory = (id) => {
    dispatch(setCategory({ data: id }));
  };
  return (
    <div className="">
      <div className="max-w-7xl mx-auto py-4 overflow-x-auto scrollbar-hide flex gap-10 mb-10">
        {list?.map(({ image, title, _id }) => {
          return (
            <div
              className="col-span-1 flex flex-col justify-start md:col-span-2 lg:col-span-1 cursor-pointer"
              key={_id}
              onClick={() => handleCategory(_id)}
            >
              <img
                src={image}
                alt={title}
                className="flex-none w-24 h-24 bg-gray-100 rounded-md object-center object-cover"
              />
              <p className="w-24 mt-2">{title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SquareList;
