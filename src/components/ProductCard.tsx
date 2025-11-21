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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 pt-5 p-6">
      {product.length === 0 ? (
        <p className="text-lg">No products found.</p>
      ) : (
        product.map((item) => (
          <div
            key={item.id}
            className="bg-[#F0F2F7] rounded-2xl p-3 shadow-lg flex flex-col h-full"
          >
            <div className="overflow-hidden rounded-full">
              <img
                className="h-70 sm:h-56 md:h-55 w-full object-contain bg-gray-300 p-9 hover:scale-120 transition duration-300 ease-in-out cursor-pointer"
                src={item.image || noimage}
                alt={item.title}
              />
            </div>

            <div className="mt-4 flex flex-col gap-2 flex-grow">
              <h3 className="font-bold text-amber-950 line-clamp-2">
                {item.title}
              </h3>
              <p className="text-sm capitalize">Category: {item.category}</p>
              <p className="font-bold text-lg">$ {item.price}</p>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-2">
              <Link
                to={`/product/${item.id}`}
                className="text-blue-500 text-sm hover:scale-105"
              >
                See More...
              </Link>
              <div className="flex gap-2">
                <button
                  onClick={() => dispatch(setEditing(item))}
                  className="text-sm px-3 py-1 rounded hover:bg-gray-300 cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={() => dispatch(deleteProduct(item.id))}
                  className="text-sm px-3 py-1 rounded hover:bg-gray-300 cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
