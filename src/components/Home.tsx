import Searchbar from "./Searchbar";
import google from "../assets/google.jpg";
import firefox from "../assets/flipkart.webp";
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
    { title: "Women's Clothing", imageUrl: "https://littleboxindia.com/cdn/shop/files/Citrus_Bloom_Strappy_Fit_Flare_Midi_Dress_720x.webp?v=1757681835"},
    { title: "jewelery", imageUrl: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRBgqP_qZYLJeMyyw_oTuIa5nJhrNBVn62Q-R5NKfVgP2DaYsLXgioilCfz5myKhg69AXOTjbdDtZRptKo5U_ViMSONZBdJcjKZXBGmWcTO332b6r0smgtH5A"},
    { title: "electronics", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_0gqdl_e2gVubvQ7o0NIopOCenDLYlgLhIA&s" },
  ];

  return (

    //wallpaper update
    <div
      className="bg-cover bg-fixed min-h-screen"
      style={{ backgroundImage: `url(${background})` }}
    >
      {/* firefox icon */}
      <div className="flex items-center gap-1 p-2">
        <img src={firefox} alt="Firefox" className="h-14 rounded-full" />
        <h1 className="font-bold text-xl">Flipkart</h1>
      </div>

      {/* search bar */}
      <div className="flex justify-center">
        <Searchbar
          iconUrl={google}
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
