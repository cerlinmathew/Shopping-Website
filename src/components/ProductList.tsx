import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "./ProductCard";
import { fetchProducts } from "../slices/productSlice";
import type { RootState, AppDispatch } from "../store/store";

export default function ProductList({
  search,
  category,
}: {
  search: string;
  category: string;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const { list: products, loading } = useSelector((s: RootState) => s.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const cleaned = search.trim().toLowerCase();

  const filteredProducts = products.filter((item) => {
    const matchSearch =
      cleaned === "" ? true : item.title.toLowerCase().includes(cleaned);

    const matchCategory =
      category === "all" ? true : item.category.toLowerCase() === category;

    return matchSearch && matchCategory;
  });

  if (loading) return <p className="text-white text-lg">Loading...</p>;

  return <ProductCard product={filteredProducts} />;
}
