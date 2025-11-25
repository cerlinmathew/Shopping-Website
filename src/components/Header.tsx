import flipkart from "../assets/flipkart.webp";
import Searchbar from "./Searchbar";
import AddtoCart from "./AddtoCart";


type HeaderProps = {
searchText: string;
setSearchText: (text: string) => void;
category: string;
setCategory: (cat: string) => void;
};


export default function Header({ setSearchText, category, setCategory }: HeaderProps) {
return (
<header className="sticky top-0 z-50 bg-white/50 backdrop-blur-xl shadow-sm border-b">

<div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-6">


{/* Logo */}
<div className="flex items-center gap-2">
<img src={flipkart} alt="Flipkart" className="h-9 w-9 rounded-full" />
<span className="font-semibold text-lg tracking-tight">Flipkart</span>
</div>


{/* Search + Category */}
<div className="hidden md:flex flex-1 items-center gap-3">
<div className="flex-1">
<Searchbar onChangeText={setSearchText} />
</div>
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


{/* Right Nav */}
<div className="flex items-center gap-6">
<nav className="flex gap-6 text-sm font-semibold text-slate-700">
  <a className="hover:text-blue-600 transition">Home</a>
  <a className="hover:text-blue-600 transition">Products</a>
  <a className="hover:text-blue-600 transition">About</a>
  <a className="hover:text-blue-600 transition">Contact</a>
</nav>

<AddtoCart />
</div>


</div>
</header>
);
}