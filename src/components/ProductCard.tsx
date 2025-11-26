import noimage from "@/assets/noimage.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteProduct, setEditing } from "../slices/productSlice";
import type { Product } from "../slices/productSlice";
import type { AppDispatch } from "../store/store";

type ProductCardProps = {
  product: Product[];
};

export default function ProductCard({ product }: ProductCardProps) {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4 py-8 outline-none">
      {product.length === 0 ? (
        <p className="text-lg">No products found.</p>
      ) : (
        product.map((item) => (
          <div
            key={item.id}
            onClick={() => navigate(`/product/${item.id}`)}
            className="group ring-1 ring-[#E3E7EE] rounded-2xl cursor-pointer flex flex-col transition bg-[#1f1a000e]"
          >
            {/* IMAGE */}
            <div className="relative overflow-hidden ">
              <div className="aspect-[4/3] p-4">
                <img
                  src={item.image || noimage}
                  alt={item.title}
                  className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              <span className="absolute top-2 left-2 bg-[rgb(93,94,96)] text-[11px] px-3 py-1 rounded-full font-semibold text-amber-50">
                {item.category}
              </span>
            </div>

            {/* CONTENT */}
            <div className="p-4 flex flex-col flex-1 gap-3">
              <h3 className="text-sm font-semibold line-clamp-2">
                {item.title}
              </h3>

              <p className="text-xs text-amber-950">
                Premium Quality Product
              </p>

              <p className="text-lg font-bold text-amber-950">
                ${item.price}
              </p>

              {/* ACTIONS */}
              <div className="mt-auto flex justify-between items-center">
                <Link
                  to={`/product/${item.id}`}
                  onClick={(e) => e.stopPropagation()}
                  className="text-sm text-blue-400 hover:text-blue-300 font-medium"
                >
                  View Details...
                </Link>

                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(setEditing(item));
                    }}
                    className="px-3 py-1 rounded-full text-xs hover:scale-110 transition cursor-pointer"
                  >
                    Edit
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(deleteProduct(item.id));
                    }}
                    className="px-3 py-1 rounded-full text-xs hover:scale-110 transition cursor-pointer"
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
