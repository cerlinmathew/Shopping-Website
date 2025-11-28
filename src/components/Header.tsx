import { useState } from "react";
import flipkart from "../assets/flipkart.webp";
import Searchbar from "./Searchbar";
import AddtoCart from "./AddtoCart";
import { Menu, X } from "lucide-react";
import { useAuth0 } from "@auth0/auth0-react";

type HeaderProps = {
  searchText: string;
  setSearchText: (text: string) => void;
  category: string;
  setCategory: (cat: string) => void;
};

export default function Header({
  setSearchText,
  category,
  setCategory,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { logout } = useAuth0();

  return (
    <header className="sticky top-0 z-50 bg-[#2746A8]">
      <div className="max-w-7xl mx-auto px-8 py-2">

        <div className="flex items-center justify-between gap-3">


          <div className="flex items-center gap-2">
            <img
              src={flipkart}
              alt="Flipkart"
              className="h-9 w-9 rounded-full"
            />
            <span className="font-semibold text-lg text-white">
              Flipkart
            </span>
          </div>

          <div className="hidden md:flex flex-1 items-center gap-3">
            <div className="">
              <Searchbar onChangeText={setSearchText} />
            </div>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-3 py-1 rounded-full bg-gray-100 text-sm shadow-sm focus:outline-none cursor-pointer border-none text-gray-600"
            >
              <option value="all">All Categories</option>
              <option value="men's clothing">Men's Clothing</option>
              <option value="women's clothing">Women's Clothing</option>
              <option value="jewelery">Jewelery</option>
              <option value="electronics">Electronics</option>
            </select>
          </div>

          <div className="flex items-center gap-4">

         
            <button
              onClick={() =>
                logout({
                  logoutParams: {
                    returnTo: window.location.origin, // redirects to Login page
                  },
                })
              }
              className="text-white font-semibold text-sm cursor-pointer hover:scale-105"
            >
              Logout
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-md text-white"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            <AddtoCart />
          </div>
        </div>

        <div className="mt-3 flex flex-col gap-3 md:hidden">
          <Searchbar onChangeText={setSearchText} />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-2 rounded-full bg-gray-100 text-sm shadow-sm focus:outline-none"
          >
            <option value="all">All Categories</option>
            <option value="men's clothing">Men's Clothing</option>
            <option value="women's clothing">Women's Clothing</option>
            <option value="jewelery">Jewelery</option>
            <option value="electronics">Electronics</option>
          </select>
        </div>
        


        {mobileMenuOpen && (
          <nav className="lg:hidden mt-4 flex flex-col gap-3 text-sm font-semibold text-white">
            <a className="hover:text-blue-200 transition cursor-pointer">Home</a>
            <a className="hover:text-blue-200 transition cursor-pointer">Products</a>
            <a className="hover:text-blue-200 transition cursor-pointer">About</a>
            <a className="hover:text-blue-200 transition cursor-pointer">Contact</a>
          </nav>
        )}

      </div>
    </header>
  );
}
