import { useSelector, useDispatch } from "react-redux";
import { increaseQty, decreaseQty, removeFromCart } from "../slices/cartSlice";
import type { RootState } from "../store/store";
import { X, Plus, Minus, Trash2 } from "lucide-react";
import { useEffect } from "react";

export default function CartModal({ close }: { close: () => void }) {
  const cartItems = useSelector((s: RootState) => s.cart.items);
  const dispatch = useDispatch();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex justify-end">

      {/* SIDE CART PANEL */}
      <div className="w-[420px] h-screen bg-slate-900 shadow-2xl flex flex-col">

        {/* HEADER */}
        <div className="p-5 border-b border-slate-700 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">Your Cart</h2>
          <button onClick={close}>
            <X className="text-slate-400 hover:text-white transition" />
          </button>
        </div>

        {/* CART ITEMS */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5 pb-40">

          {cartItems.length === 0 ? (
            <div className="text-center text-slate-400 mt-24">
              🛒 Your cart is empty
            </div>
          ) : (
            cartItems.map(item => (
              <div
                key={item.id}
                className="flex gap-4 bg-slate-800 rounded-2xl p-4 shadow-lg ring-1 ring-slate-700"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-20 object-contain bg-slate-700 rounded-xl p-2"
                />

                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-white line-clamp-2">
                    {item.title}
                  </h4>

                  <p className="text-emerald-400 font-bold mt-1">
                    ${item.price}
                  </p>

                  <div className="flex items-center gap-3 mt-3">
                    <button
                      onClick={() => dispatch(decreaseQty(item.id))}
                      className="border border-slate-600 text-white px-2 py-1 rounded-md hover:bg-slate-700"
                    >
                      <Minus size={14} />
                    </button>

                    <span className="font-semibold text-white">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => dispatch(increaseQty(item.id))}
                      className="border border-slate-600 text-white px-2 py-1 rounded-md hover:bg-slate-700"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="text-red-500 hover:text-red-400 self-start"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* FOOTER */}
        {cartItems.length > 0 && (
          <div className="sticky bottom-0 bg-slate-900 border-t border-slate-700 p-5 shadow-xl">

            <div className="flex justify-between text-lg font-semibold mb-3 text-white">
              <span>Total</span>
              <span className="text-blue-400">${total.toFixed(2)}</span>
            </div>

            <button className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-xl font-semibold">
              Checkout Securely
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
