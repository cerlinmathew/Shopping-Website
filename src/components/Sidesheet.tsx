import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Edit, CircleX } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, updateProduct, setEditing } from "../slices/productSlice";
import type { Product } from "../slices/productSlice";
import type { RootState, AppDispatch } from "../store/store";

export default function Sidesheet() {
  const dispatch = useDispatch<AppDispatch>();
  const editing = useSelector((s: RootState) => s.products.editing);

  const [open, setOpen] = useState(false);

  // store filename + size for preview
  const [fileInfo, setFileInfo] = useState<{ name: string; size: number } | null>(null);

  const [form, setForm] = useState({
    id: "",
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
  });

  // open sheet when editing is set
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
      dispatch(setEditing(null));
      setForm({
        id: "",
        title: "",
        price: "",
        description: "",
        category: "",
        image: "",
      });
      setFileInfo(null);
    }
  }, [open, dispatch]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  }

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
      console.log("Uploaded file:", file);

    setFileInfo({
      name: file.name,
      size: file.size,
    });

    const reader = new FileReader();
    reader.onload = () => {
      setForm((p) => ({ ...p, image: reader.result as string }));
    };
    reader.readAsDataURL(file);
  }

  // remove uploaded image
  function removeImage() {
    setForm((p) => ({ ...p, image: "" }));
    setFileInfo(null);
  }

  function closeSheet() {
    setOpen(false);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.title || !form.price) {
      alert("Please provide title and price");
      return;
    }

    const payload: Product = {
      id: Number(form.id) || Date.now(),
      title: form.title,
      price: Number(form.price),
      description: form.description,
      category: form.category,
      image: form.image,
    };

    if (editing) {
      dispatch(updateProduct(payload));
      alert("Product updated (local store).");
    } else {
      dispatch(addProduct(payload));
      alert("Product added (local store).");
    }

    closeSheet();
  }

  return (
    <Sheet open={open} onOpenChange={(val: boolean) => setOpen(val)}>
      <SheetTrigger className="text-white bg-gray-700 cursor-pointer px-4 py-2 rounded-lg hover:bg-gray-600 flex gap-2">
        <Edit className="w-5 h-5" /> Add Product
      </SheetTrigger>

      <SheetContent className="bg-white overflow-y-auto px-6">
        <SheetHeader>
          <SheetTitle className="text-xl font-bold m-auto">
            {editing ? "Edit Product" : "Add New Product"}
          </SheetTitle>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            name="id"
            placeholder="Product ID (optional)"
            className="w-full p-3 rounded-lg bg-gray-400 focus:ring-1 outline-none"
            value={form.id}
            onChange={handleChange}
          />

          <input
            name="title"
            placeholder="Enter product title"
            className="w-full p-3 rounded-lg bg-gray-400 focus:ring-1 outline-none"
            value={form.title}
            onChange={handleChange}
            required
          />

          <input
            name="price"
            type="number"
            placeholder="Enter price"
            className="w-full p-3 rounded-lg bg-gray-400 focus:ring-1 outline-none"
            value={form.price}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Enter product description"
            className="w-full p-3 rounded-lg bg-gray-400 focus:ring-1 outline-none min-h-[100px]"
            value={form.description}
            onChange={handleChange}
          />

          <input
            name="category"
            placeholder="Enter category"
            className="w-full p-3 rounded-lg bg-gray-400 focus:ring-1 outline-none"
            value={form.category}
            onChange={handleChange}
          />

          {/* image upload */}
          <div className="space-y-3">
            {form.image ? (
              <div className="relative bg-gray-100 p-3 rounded-lg">
                <img
                  src={form.image}
                  alt="uploaded"
                  className="w-24 h-24 object-cover rounded-md"
                />

                {/* file info */}
                {fileInfo && (
                  <div className="mt-2 text-sm text-gray-700">
                    <p><strong>Name:</strong> {fileInfo.name}</p>
                    <p><strong>Size:</strong> {(fileInfo.size / 1024).toFixed(2)} KB</p>
                  </div>
                )}

                {/* remove button */}
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2  p-1 rounded-full hover:scale-110"
                  title="Remove Image"
                >
                  <CircleX size={16} className="cursor-pointer"/>
                </button>
              </div>
            ) : (
              <>
                <label
                  htmlFor="fileUpload"
                  className="w-full text-gray-600 bg-gray-400 block p-3 rounded-lg cursor-pointer"
                >
                  Upload Image
                </label>
                <input
                  id="fileUpload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </>
            )}
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer p-3 rounded-lg bg-neutral-600 hover:bg-neutral-500 transition text-white font-bold shadow-lg"
          >
            {editing ? "Update Product" : "Add Product"}
          </button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
