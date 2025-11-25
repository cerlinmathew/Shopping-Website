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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 py-6">
      {product.length === 0 ? (
        <p className="text-lg text-white">No products found.</p>
      ) : (
        product.map((item) => (
          <div
            key={item.id}
            className="group bg-slate-900/70 rounded-2xl shadow-xl shadow-black/40 ring-1 ring-slate-700 transition-all duration-300  hover:shadow-2xl hover:ring-blue-500/70"
          >
            {/* IMAGE */}
            <div className="relative overflow-hidden rounded-t-2xl bg-slate-800">
              <div className="aspect-[4/3] p-4">
                <img
                  src={item.image || noimage}
                  alt={item.title}
                  className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              <span className="absolute top-3 left-3 bg-blue-600 text-white text-[11px] px-3 py-1 rounded-full font-semibold">
                {item.category}
              </span>
            </div>

            {/* CONTENT */}
            <div className="p-4 flex flex-col gap-2">
              <h3 className="text-sm font-semibold text-white line-clamp-2">
                {item.title}
              </h3>

              <p className="text-xs text-slate-400">Premium Quality Product</p>

              <p className="text-lg font-bold text-emerald-400 flex flex-1">
                ${item.price}
              </p>

              {/* ACTIONS */}
              <div className="mt-3 flex justify-between items-center">
                <Link
                  to={`/product/${item.id}`}
                  className="text-sm text-blue-400 hover:text-blue-300 font-medium"
                >
                  View Details →
                </Link>

                <div className="flex gap-2">
                  <button
                    onClick={() => dispatch(setEditing(item))}
                    className="px-3 py-1 rounded-full text-xs  text-white hover:scale-110 transition cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => dispatch(deleteProduct(item.id))}
                    className="px-3 py-1 rounded-full text-xs  text-white hover:scale-110 transition cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
