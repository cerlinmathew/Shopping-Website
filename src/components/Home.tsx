import { useState } from "react";
import Header from "./Header";
import ProductList from "./ProductList";
import Sidesheet from "./Sidesheet";

export default function Home() {
  const [searchText, setSearchText] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  return (
    <div className="min-h-screen">

      <Header 
        searchText={searchText}
        setSearchText={setSearchText}
        category={categoryFilter}
        setCategory={setCategoryFilter}
      />

      <div className="max-w-7xl mx-auto px-7">

        <ProductList search={searchText} category={categoryFilter} />

        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6">
          <Sidesheet />
        </div>
      </div>
    </div>
  );
}
