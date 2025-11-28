import noimage from "@/assets/noimage.jpg";
import {useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteProduct, setEditing } from "../slices/productSlice";
import type { Product } from "../slices/productSlice";
import type { AppDispatch } from "../store/store";
import Lottiefy from "../components/lottie/Lottiefy";
import Notfound from "../components/lottie/Notfound.json";
import { urlTitle } from "../utils/url";

type ProductCardProps = {
  product: Product[];
};
console.log(Notfound,"Product Not Found")

export default function ProductCard({ product }: ProductCardProps) {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  return (
<div
  className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-4 py-8 outline-none
  ${
    product.length === 0
      ? "lg:grid-cols-1 h-[calc(100vh-90px)] overflow-hidden"
      : "lg:grid-cols-5"
  }`}
>

      {product.length === 0 ? (
        <p className="text-lg font-bold flex flex-col justify-center items-center"><Lottiefy loop={true} json={Notfound} height={150} width={150} />Product Not Found</p>
      ) : (
        product.map((item) => (
          <div
            key={item.title}
            onClick={() => navigate(`/product/${urlTitle(item.title)}`)}
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

              <span className="absolute top-2 left-2 bg-[rgb(93,94,96)] text-[0.6rem] px-3 py-1 rounded-full font-semibold text-amber-50">
                {item.category}
              </span>
            </div>

            {/* CONTENT */}
            <div className="p-4 flex flex-col flex-1 gap-3">
              <h3 className=" font-bold line-clamp-2">
                {item.title}
              </h3>


              

              {/* ACTIONS */}
              <div className="mt-auto flex justify-between items-center">
               <p className="text-sm font-bold text-amber-950">${item.price}</p>

                <div className="flex">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(setEditing(item));
                    }}
                    className=" py-3 rounded-full text-xs hover:scale-110 transition cursor-pointer"
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
