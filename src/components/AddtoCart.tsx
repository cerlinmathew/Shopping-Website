import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import CartModal from "./CartModal";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

export default function AddtoCart() {
  const [open, setOpen] = useState(false);

  const cartCount = useSelector((state: RootState) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  return (
    <>
   
      <div
        onClick={() => setOpen(true)}
        className="relative cursor-pointer flex items-center justify-center
                    w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12
                    rounded-full hover:scale-110 transition"
      >
        <ShoppingCart
          className="
                      w-5 h-5
                      sm:w-6 sm:h-6
                      md:w-7 md:h-7
                      text-white  transition
                      "
        />
        {/* {if cart has items} */}

        {cartCount > 0 && (
          <span
            className="absolute top-1 right-1
                        sm:-top-2 sm:-right-2
                        bg-red-500 text-white text-[0.625rem] sm:text-xs
                        font-bold min-w-[1.125rem] h-[1.125rem] sm:h-[1.25rem]
                        flex items-center justify-center rounded-full"
          >
            {cartCount}
          </span>
        )}
      </div>


      {open && (
        <div className="fixed inset-0">
          <CartModal close={() => setOpen(false)} />
        </div>
      )}
    </>
  );
}
  