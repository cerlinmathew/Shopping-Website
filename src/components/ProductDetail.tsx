import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import noimage from "@/assets/noimage.jpg";
import { fetchProducts } from "../slices/productSlice";
import type { RootState, AppDispatch } from "../store/store";
import { X } from "lucide-react";
import { addToCart } from "../slices/cartSlice";

export default function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const cartItems = useSelector((s: RootState) => s.cart.items);
  const { list: products, loading } = useSelector((s: RootState) => s.products);
  const product = products.find((p) => p.id === Number(id));
  if (loading) return <p className="p-4">Loading product...</p>;
  if (!product) return <p className="p-4">Product Not Found</p>;

  const isInCart = cartItems.some((i) => i.id === product.id);
  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      {/* modalbox, layer2 */}
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl p-6 relative">
        {/* close button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 right-4 text-gray-500 hover:text-black cursor-pointer"
        >
          <X />
        </button>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Image Section */}
          <div className="md:w-1/2">
            <img
              src={product.image || noimage}
              alt={product.title}
              className="w-full h-80 rounded-xl p-2"
            />
          </div>

          {/* Info Section */}
          <div className="md:w-1/2 flex flex-col justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {product.title}
              </h1>

              <p className="text-2xl text-blue-600 font-semibold mt-2">
                ${product.price}
              </p>

              <p className="mt-4 text-gray-600 leading-relaxed">
                {product.description}
              </p>

              <p className="mt-4 text-sm text-gray-500">
                Category:{" "}
                <span className="font-medium">{product.category}</span>
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-6">
              <button
                onClick={() => dispatch(addToCart(product))}
                disabled={isInCart}
                className={`flex-1 py-2 rounded-xl text-white
  ${
    isInCart
      ? "bg-green-600 cursor-not-allowed"
      : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
  }`}
              >
                {isInCart ? "Added to Cart" : "Add to Cart"}
              </button>

              <button className="flex-1 border border-blue-600 text-blue-600 hover:bg-blue-50 py-2 rounded-xl cursor-pointer">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
