// src/components/Sidesheet.tsx
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Edit } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, updateProduct, setEditing } from "../slices/productSlice";
import type { Product} from "../slices/productSlice";
import type { RootState, AppDispatch } from "../store/store";

export default function Sidesheet() {
  const dispatch = useDispatch<AppDispatch>();
  const editing = useSelector((s: RootState) => s.products.editing);

  // local open state for the Sheet
  const [open, setOpen] = useState(false);

  // form state
  const [form, setForm] = useState({
    id: "",
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
  });

  // open sheet when editing is set, also prefill form
  useEffect(() => {
    if (editing) {
      setForm({
        id: String(editing.id),
        title: editing.title,
        price: String(editing.price),
        description: editing.description,
        category: editing.category,
        image: editing.image,
      });
      setOpen(true);
    }
  }, [editing]);

  // reset when sheet closed
  useEffect(() => {
    if (!open) {
      // clear editing in redux
      dispatch(setEditing(null));
      setForm({
        id: "",
        title: "",
        price: "",
        description: "",
        category: "",
        image: "",
      });
    }
  }, [open, dispatch]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    


  }
  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {

    console.log(e.target.files);
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setForm((p) => ({ ...p, image: reader.result as string }));
    };
    reader.readAsDataURL(file);
  }


  function closeSheet() {
    setOpen(false);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // basic validation
    if (!form.title || !form.price) {
      alert("Please provide title and price");
      return;
    }

    const payload: Product = {
      id: Number(form.id) || Date.now(), // fallback id if not provided
      title: form.title,
      price: Number(form.price),
      description: form.description,
      category: form.category,
      image: form.image,
    };

    if (editing) {
      // update
      dispatch(updateProduct(payload));
      alert("Product updated (local store).");
    } else {
      // add
      dispatch(addProduct(payload));
      alert("Product added (local store).");
    }

    // close and reset
    closeSheet();
  }

  return (
    <Sheet open={open} onOpenChange={(val: boolean) => setOpen(val)}>
      <SheetTrigger className="text-white bg-gray-700 cursor-pointer px-4 py-2 rounded-lg hover:bg-gray-600 flex gap-2">
        <Edit className="w-5 h-5" /> Add Product
      </SheetTrigger>

      <SheetContent className="bg-gray-950 text-white overflow-y-auto px-6 py-6">
        <SheetHeader>
          <SheetTitle className="text-xl font-bold mb-4">
            {editing ? "Edit Product" : "Add New Product"}
          </SheetTitle>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1">
            <label className="text-sm text-gray-300">Product ID</label>
            <input
              name="id"
              placeholder="Enter product ID (optional)"
              className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
              value={form.id}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm text-gray-300">Title</label>
            <input
              name="title"
              placeholder="Enter product title"
              className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm text-gray-300">Price</label>
            <input
              name="price"
              type="number"
              placeholder="Enter price"
              className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
              value={form.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm text-gray-300">Description</label>
            <textarea
              name="description"
              placeholder="Enter product description"
              className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none min-h-[100px]"
              value={form.description}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm text-gray-300">Category</label>
            <input
              name="category"
              placeholder="Enter category"
              className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
              value={form.category}
              onChange={handleChange}
            />
          </div>

        <div className="space-y-1">
      <label
        htmlFor="fileUpload"
        className="w-full block bg-gray-900 text-gray-300 p-3 rounded-lg border border-gray-700 cursor-pointer hover:bg-gray-800"
      >
        Upload Image
      </label>

      <input
        id="fileUpload"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleImageUpload(e)}
      />
    </div>


          <button
            type="submit"
            className="w-full p-3 rounded-lg bg-blue-600 hover:bg-blue-500 transition text-white font-bold shadow-lg"
          >
            {editing ? "Update Product" : "Add Product"}
          </button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
