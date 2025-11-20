import Searchbar from "./Searchbar";
import google from "../assets/google.jpg";
import flipkart from "../assets/flipkart.webp";
import Category from "./Category";
import ProductList from "./ProductList";
import { useState } from "react";
import Sidesheet from "./Sidesheet";

// wallpapers
import window1 from "@/assets/window1.jpg";
import window2 from "@/assets/window2.jpg";
import window3 from "@/assets/window3.jpg";
import window4 from "@/assets/window4.jpg";
import window5 from "@/assets/window5.jpg";
import window6 from "@/assets/window6.jpg";

export default function Home() {
 
  const [searchText, setSearchText] = useState(""); //news filter : used by ProductList.

  const [background, setBackground] = useState(); //change background : updated by sidesheet.
  const [categoryFilter, setCategoryFilter] = useState("");


  const icons = [
    { title: "Men's Clothing", imageUrl: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRFeKx72zk9BmGumOH_z7UeJKHMU4IE7fLYG3PvRfIAMqPdnVeStD7IF0mmI4bvu6JprXocThypuBjrEUEmA3aAhs0Ql16S5NP2FPyQl0mWLPUEa4tdS5CqcA"},
    { title: "Women's Clothing", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkaVTDwCK25O8gA0aFtLh0zjNkL4oA98A-mQ&s"},
    { title: "Jewelery", imageUrl: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSCezoR-BHJqX7BVabgAGq-sp3Duf79pT4HBzexW4SeWg4pQKD1R1AYxNSIl6q6_hlzPHajhAMcr79AwGmszxKbiZOz2eJrCzEdLw_g6WknEn5maqdfO3xRRw"},
    { title: "Electronics", imageUrl: "https://st4.depositphotos.com/4475215/21136/i/1600/depositphotos_211360376-stock-photo-collection-consumer-electronics-flying-air.jpg" },
  ];

  return (

    //wallpaper update
    <div className="bg-gray-100">
      <div className="flex items-center gap-1 p-2 bg-gray-600">
        <img src={flipkart} alt="Flipkart" className="h-7 rounded-full" />
        <h1 className="font-bold">flipkart</h1>
      </div>

      {/* search bar */}
      <div className="flex justify-center">
        <Searchbar       
          onChangeText={(val) => setSearchText(val)}
        />
      </div>

      {/* short icons */}
      <Category icons={icons}  onSelectCategory={(cat) => setCategoryFilter(cat)}/>

     
      <ProductList search={searchText} category={categoryFilter} />

      {/* customise button */}
      <div className="fixed bottom-6 right-6">
        <Sidesheet  />
      </div>
    </div>
  );
}
