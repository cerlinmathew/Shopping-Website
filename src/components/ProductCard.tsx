import React from "react";
import noimage from "@/assets/noimage.jpg";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteProduct, setEditing } from "../slices/productSlice";
import type { Product } from "../slices/productSlice";
import type { AppDispatch } from "../store/store";

type ProductCardProps = {
  product: Product[];
};

export default function ProductCard({ product }: ProductCardProps) {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div>
      <div className="
        grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 
        gap-6 pt-5 p-6 
        w-auto m-auto
      ">
        {product.length === 0 ? (
          <p className="text-white text-lg">No products found.</p>
        ) : (
          product.map((item) => (
            <div
              key={item.id}
              className="
                bg-[#F0F2F7] rounded-2xl
                p-3 
                shadow-lg 
                flex flex-col 
                h-full w-full
              "
            >
              <div className=" overflow-hidden rounded-full">
              <img
                className="h-60 w-full bg-gray-300 p-12 hover:scale-115 transition duration-300 ease-in-out"
                src={item.image || noimage}
                alt={item.title}
              /></div>

              <div className="mt-4 flex flex-col gap-2 flex-grow justify-evenly">
                <h3 className="font-bold text-amber-950">{item.title}</h3>
                <p className="text-sm text-amber-950 p-1 capitalize">
                  Category: {item.category}
                </p>
                <p className="text-amber-950 font-bold text-lg">$ {item.price}</p>
                {/* <p className="text-gray-400 text-sm line-clamp-3">
                  {item.description}
                </p> */}
              </div>

              <div className="flex justify-between items-center pt-2 gap-4">
                <Link
                  to={`/product/${item.id}`}
                  className="text-blue-300 text-sm hover:text-blue-400"
                >
                  See More...
                </Link>

                <div className="ml-auto flex gap-2">
                  <button
                    onClick={() => dispatch(setEditing(item))}
                    className=" text-amber-950 text-sm p-2 px-3 rounded font-semibold cursor-pointer hover:bg-gray-400"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => {
                      if (confirm(`Delete "${item.title}"?`)) {
                        dispatch(deleteProduct(item.id));
                      }
                    }}
                    className=" text-sm p-2 px-3 rounded font-semibold cursor-pointer hover:bg-gray-400"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
