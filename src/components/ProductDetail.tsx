import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import noimage from "@/assets/noimage.jpg";
import type { RootState, AppDispatch } from "../store/store";
import { X } from "lucide-react";
import { addToCart, removeFromCart } from "../slices/cartSlice";
import Lottiefy from "../components/lottie/Lottiefy";
import Notfound from "../components/lottie/Notfound.json";
import Loader from "./Loader";
import { urlTitle } from "@/utils/url";

export default function ProductDetail() {
  const { title } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const cartItems = useSelector((s: RootState) => s.cart.items);
  const { list: products, loading } = useSelector((s: RootState) => s.products);

  const product = products.find((p) => urlTitle(p.title) === title);

  if (loading) {
    return (
      <p className="p-4">
        <Loader />
      </p>
    );
  }

  if (!product) {
    return (
      <p className="flex flex-col justify-center items-center min-h-screen font-bold">
        <Lottiefy loop={true} json={Notfound} height={150} width={150} />
        Product Not Found
      </p>
    );
  }

  const isInCart = cartItems.some((i) => i.id === product.id);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl relative max-h-[90vh] overflow-y-auto relative">
        {/* Close button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-3 right-3 text-gray-500 hover:text-black cursor-pointer"
        >
          <X />
        </button>

        <div className="flex flex-col md:flex-row gap-6 p-5 sm:p-8">
          {/* Image Section */}
          <div className="md:w-1/2">
            <img
              src={product.image || noimage}
              alt={product.title}
              className="max-w-full h-auto max-h-[300px] p-5 sm:max-h-[400px] object-contain rounded-xl"
            />
          </div>

          {/* Info Section */}
          <div className="w-full md:w-1/2 flex flex-col justify-between space-y-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                {product.title}
              </h1>

              <p className="text-xl sm:text-2xl text-blue-800 font-semibold mt-2">
                ${product.price}
              </p>

              <p className="mt-4 text-gray-600 leading-relaxed text-justify  sm:text-wrap">
                {product.description}
              </p>

              <p className="mt-4 text-sm text-gray-500">
                Category:{" "}
                <span className="font-medium">{product.category}</span>
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <button
                onClick={() => dispatch(addToCart(product))}
                disabled={isInCart}
                className={` rounded-xl ${
                  isInCart
                    ? "w-full bg-green-600 cursor-not-allowed"
                    : "w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:scale-105 cursor-pointer text-white"
                }`}
              >
                {isInCart ? "Added to Cart" : "Add to Cart"}
              </button>

              <button
                onClick={() => dispatch(removeFromCart(product.id))}
                className="w-full sm:w-auto p-4 rounded-xl border hover:scale-105 transition text-xs cursor-pointer"
              
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
