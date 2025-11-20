import React from "react";
import noimage from "@/assets/noimage.jpg";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteProduct, setEditing, updateProduct } from "../slices/productSlice";
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
        grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 
        gap-6 pt-5 p-6 
        w-[75rem] m-auto
      ">
        {product.length === 0 ? (
          <p className="text-white text-lg">No products found.</p>
        ) : (
          product.map((item) => (
            <div
              key={item.id}
              className="
                bg-[#1e1e2f] 
                p-5 
                text-white 
                rounded-2xl 
                shadow-lg 
                hover:-translate-y-2 
                transition 
                flex flex-col 
                h-full
              "
            >
              <img
                className="h-70 rounded-xl bg-gray-300"
                src={item.image || noimage}
                alt={item.title}
              />

              <div className="mt-4 flex flex-col gap-2 flex-grow">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-300 capitalize">
                  Category: {item.category}
                </p>
                <p className="text-blue-300 font-bold text-lg">$ {item.price}</p>
                <p className="text-gray-400 text-sm line-clamp-3">
                  {item.description}
                </p>
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
                    className="bg-amber-300 text-black p-2 px-3 rounded font-semibold"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => {
                      if (confirm(`Delete "${item.title}"?`)) {
                        dispatch(deleteProduct(item.id));
                      }
                    }}
                    className="bg-red-600 text-white p-2 px-3 rounded font-semibold"
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
