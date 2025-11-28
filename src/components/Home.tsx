import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";
import Header from "./Header";
import ProductList from "./ProductList";
import Sidesheet from "./Sidesheet";
import Loader from "./Loader";

export default function Home() {
  const [searchText, setSearchText] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const { isAuthenticated, isLoading } = useAuth0();


  if (isLoading) {
    return <div className="flex justify-center items-center h-screen"><Loader /></div>;
  }

  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header
        searchText={searchText}
        setSearchText={setSearchText}
        category={categoryFilter}
        setCategory={setCategoryFilter}
      />

      <div className="flex-1 px-4 overflow-y-auto">
        <ProductList search={searchText} category={categoryFilter} />

        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6">
          <Sidesheet />
        </div>
      </div>
    </div>
  );
}
