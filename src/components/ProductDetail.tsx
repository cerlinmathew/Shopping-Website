
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import noimage from "@/assets/noimage.jpg";
import { fetchProducts } from "../slices/productSlice";
import type { RootState, AppDispatch } from "../store/store";

export default function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const { list: products, loading, editing } = useSelector((s: RootState) => s.products);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);
//find product
  const product = products.find((p) => p.id === Number(id));

  if (loading) return <p className=" p-4">Loading product...</p>;

  if (!product)
    return (
      <p className=" p-4">
        Product Not Found, try adding this product again
      </p>
    );

  return (
    <div className=" p-10 max-w-2xl m-auto">
      <img
        src={product.image || noimage}
        alt={product.title}
        className="w-full rounded-xl mb-6 h-[30rem]"
      />

      <h1 className="text-3xl font-bold">{product.title}</h1>
      <p className="text-xl  font-semibold mt-2">${product.price}</p>

      <p className="mt-4">{product.description}</p>

      <p className="mt-4 text-sm">
        Category: {product.category}
      </p>
    </div>
  );
}
