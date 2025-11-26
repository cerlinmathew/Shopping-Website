import { useSelector, useDispatch } from "react-redux";
import { increaseQty, decreaseQty, removeFromCart } from "../slices/cartSlice";
import type { RootState } from "../store/store";
import { X, Plus, Minus, Trash2 } from "lucide-react";

export default function CartModal({ close }: { close: () => void }) {
  const cartItems = useSelector((s: RootState) => s.cart.items);
  const dispatch = useDispatch();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex justify-center sm:justify-end">

      {/* CART PANEL */}
      <div className="
        w-[420px]
        max-w-[95%]
        h-screen
        bg-slate-900
        flex flex-col
        rounded-2xl sm:rounded-none
        shadow-2xl
        relative
      ">

        {/* HEADER */}
        <div className="p-4 border-b border-slate-700 flex justify-between items-center shrink-0">
          <h2 className="text-lg font-bold text-white">Your Cart</h2>
          <button onClick={close}>
            <X className="text-slate-400 hover:text-white" />
          </button>
        </div>

        {/* SCROLL AREA */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-40">
          {cartItems.length === 0 ? (
            <div className="flex items-center justify-center h-full text-slate-400">
              Your cart is empty
            </div>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className="flex gap-3 bg-slate-800 rounded-xl p-3 shadow ring-1 ring-slate-700">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 object-contain bg-slate-700 rounded-lg p-2"
                />

                <div className="flex-1">
                  <h4 className="text-white font-semibold text-sm line-clamp-2">
                    {item.title}
                  </h4>
                  <p className="text-emerald-400 font-bold">${item.price}</p>

                  <div className="flex items-center gap-2 mt-2">
                    <button onClick={() => dispatch(decreaseQty(item.id))} className="border px-2 py-1 rounded text-white">
                      <Minus size={14} />
                    </button>
                    <span className="text-white font-semibold">{item.quantity}</span>
                    <button onClick={() => dispatch(increaseQty(item.id))} className="border px-2 py-1 rounded text-white">
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                <button onClick={() => dispatch(removeFromCart(item.id))} className="text-red-500">
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* ✅ FIXED BOTTOM CHECKOUT */}
        <div className="absolute bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-700 p-4">
          <div className="flex justify-between text-white font-semibold mb-3">
            <span>Total</span>
            <span className="text-blue-400">${total.toFixed(2)}</span>
          </div>

          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold">
            Checkout Securely
          </button>
        </div>

      </div>
    </div>
  );
}
