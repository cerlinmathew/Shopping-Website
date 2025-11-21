import Searchbar from "./Searchbar";
import flipkart from "../assets/flipkart.webp";
import Category from "./Category";
import ProductList from "./ProductList";
import { useState } from "react";
import Sidesheet from "./Sidesheet";


export default function Home() {
const [searchText, setSearchText] = useState("");
const [categoryFilter, setCategoryFilter] = useState("");


const icons = [
{ title: "Men's Clothing", imageUrl: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRFeKx72zk9BmGumOH_z7UeJKHMU4IE7fLYG3PvRfIAMqPdnVeStD7IF0mmI4bvu6JprXocThypuBjrEUEmA3aAhs0Ql16S5NP2FPyQl0mWLPUEa4tdS5CqcA" },
{ title: "Women's Clothing", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkaVTDwCK25O8gA0aFtLh0zjNkL4oA98A-mQ&s" },
{ title: "Jewelery", imageUrl: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSCezoR-BHJqX7BVabgAGq-sp3Duf79pT4HBzexW4SeWg4pQKD1R1AYxNSIl6q6_hlzPHajhAMcr79AwGmszxKbiZOz2eJrCzEdLw_g6WknEn5maqdfO3xRRw" },
{ title: "Electronics", imageUrl: "https://st4.depositphotos.com/4475215/21136/i/1600/depositphotos_211360376-stock-photo-collection-consumer-electronics-flying-air.jpg" },
];


return (
<div className="bg-gray-100 min-h-screen">
<div className="max-w-7xl mx-auto">
<div className="flex items-center gap-2 p-3 bg-gray-600 justify-between flex-wrap">
<div className="flex items-center gap-2">
<img src={flipkart} alt="Flipkart" className="h-8 sm:h-10 rounded-full" />
<h1 className="font-bold text-white text-lg sm:text-xl">Flipkart</h1>
</div>
</div>


<div className="flex justify-center px-3">
<Searchbar onChangeText={(val) => setSearchText(val)} />
</div>


<Category icons={icons} onSelectCategory={(cat) => setCategoryFilter(cat)} />
<ProductList search={searchText} category={categoryFilter} />


<div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6">
<Sidesheet />
</div>
</div>
</div>
);
}