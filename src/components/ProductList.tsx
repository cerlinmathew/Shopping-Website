import { useSelector } from "react-redux";
import ProductCard from "./ProductCard";
import type { RootState } from "../store/store";
import Loader from "./Loader";

export default function ProductList({
  search,
  category,
}: {
  search: string;
  category: string;
}) {
  const { list: products, loading } = useSelector((s: RootState) => s.products);

  const cleaned = search.trim().toLowerCase();

  const filteredProducts = products.filter((item) => {
    const matchSearch =
      cleaned === "" ? true : item.title.toLowerCase().includes(cleaned);

    const matchCategory =
      category === "all" ? true : item.category.toLowerCase() === category;

    return matchSearch && matchCategory;
  });

  if (loading) {
    return (
      <p className="text-white text-lg flex justify-center items-center h-[calc(100vh-100px)]">
        <Loader />
      </p>
    );
  }

  return <ProductCard product={filteredProducts} />;
}
