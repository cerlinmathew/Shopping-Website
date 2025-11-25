//cart icon + live item count + opens the cart modal

import { ShoppingCart } from "lucide-react";
import { useState } from "react";//cart modal is open or closed
import CartModal from "./CartModal";
import { useSelector } from "react-redux";//
import type { RootState } from "../store/store";

export default function AddtoCart() {
  const [open, setOpen] = useState(false);

  const cartCount = useSelector(
    (state: RootState) => state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  return (
    <>
      <div className="relative cursor-pointer" onClick={() => setOpen(true)}>
        <ShoppingCart className="h-7 w-7 text-gray-700 hover:text-blue-600" />

        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
            {cartCount}
          </span>
        )}
      </div>

      {open && <CartModal close={() => setOpen(false)} />}
    </>
  );
}
