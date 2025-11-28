import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Edit, CircleX } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, updateProduct, setEditing } from "../slices/productSlice";
import type { Product } from "../slices/productSlice";
import type { RootState, AppDispatch } from "../store/store";
import { toast } from "react-toastify";

export default function Sidesheet() {
  const dispatch = useDispatch<AppDispatch>();
  const editing = useSelector((s: RootState) => s.products.editing);

  const [open, setOpen] = useState(false);

  const [fileInfo, setFileInfo] = useState<{
    name: string;
    size: number;
  } | null>(null);

  const [form, setForm] = useState({
    id: "",
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // open sheet when editing is set
  function resetForm() {
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
    setErrors({});
  }

  // if editing product exists and sheet is closed → open it + load data
  if (editing && !open) {
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

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));

    // live clear error
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const maxSize = 250 * 1024 * 1024; // 250MB in bytes
    const loadingToast = toast.loading("Uploading image...");

    if (!file.type.startsWith("image/")) {
      toast.dismiss(loadingToast);
      toast.error("Only image files are allowed");
      return;
    }

    if (file.size > maxSize) {
      toast.dismiss(loadingToast);
      toast.error("Image size must be less than 250MB");
      setErrors((prev) => ({
        ...prev,
        image: "Can't upload image. Size above 250MB",
      }));
      return;
    }

    setFileInfo({ name: file.name, size: file.size });

    const reader = new FileReader();
    reader.onload = () => {
      setForm((p) => ({ ...p, image: reader.result as string }));
      setErrors((prev) => ({ ...prev, image: "" }));

      toast.dismiss(loadingToast);
      toast.success("Image uploaded successfully");
    };
    reader.onerror = () => {
      toast.dismiss(loadingToast);
      toast.error("Failed to upload image");
    };
    reader.readAsDataURL(file);
  }

  function removeImage() {
    setForm((p) => ({ ...p, image: "" }));
    setFileInfo(null);
    toast.info("Image removed");
  }

  function closeSheet() {
    setOpen(false);
  }

  // FULL VALIDATION FUNCTION
  function validate() {
    if (!form.title.trim()) {
      toast.error("Title is required");
      return false;
    }

    if (!form.price || Number(form.price) <= 0) {
      toast.error("Price must be greater than 0");
      return false;
    }

    if (!form.description.trim()) {
      toast.error("Description is required");
      return false;
    }

    if (!form.category.trim()) {
      toast.error("Category is required");
      return false;
    }

    if (!form.image) {
      toast.error("Product image is required");
      return false;
    }

    return true;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!validate()) return;

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
      toast.success("Product updated successfully");
    } else {
      dispatch(addProduct(payload));
      toast.success("Product added successfully");
    }

    closeSheet();
  }

  return (
    <Sheet
      open={open}
      onOpenChange={(val) => {
        setOpen(val);
        if (!val) resetForm();
      }}
    >
      <SheetTrigger className="fixed bottom-6 cursor-pointer right-6 flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 px-5 py-3 rounded-full text-white shadow-xl hover:scale-105 transition">
        <Edit className="w-5 h-5 " /> Add Product
      </SheetTrigger>

      <SheetContent className=" overflow-y-auto px-6 bg-white">
        <SheetHeader>
          <SheetTitle className="font-bold px-9 py-2 m-auto">
            {editing ? "Edit Product" : "Add New Product"}
          </SheetTitle>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="space-y-10">
          <input
            name="title"
            placeholder="Enter product title"
            className="w-full px-3 py-2 bg-white border-b-[1.5px] border-slate-300 outline-none text-xs"
            value={form.title}
            onChange={handleChange}
          />
          {errors.title && (
            <p className="text-red-600 text-sm">{errors.title}</p>
          )}

          <input
            name="price"
            type="number"
            placeholder="Enter price"
            className="w-full p-3 bg-white border-b-[1.5px] border-slate-300 outline-none text-xs"
            value={form.price}
            onChange={handleChange}
          />
          {errors.price && (
            <p className="text-red-600 text-sm">{errors.price}</p>
          )}

          <textarea
            name="description"
            placeholder="Enter product description"
            className="w-full p-3 bg-white border-b-[1.5px] border-slate-300 outline-none min-h-[100px] text-xs text-justify"
            value={form.description}
            onChange={handleChange}
          />
          {errors.description && (
            <p className="text-red-600 text-sm">{errors.description}</p>
          )}

          <input
            name="category"
            placeholder="Enter category"
            className="w-full p-3 bg-white border-b-[1.5px] border-slate-300 outline-none text-xs"
            value={form.category}
            onChange={handleChange}
          />
          {errors.category && (
            <p className="text-red-600 text-sm">{errors.category}</p>
          )}

          {/* Image validation */}
          <div>
            {form.image ? (
              <div className="relative bg-white border-b-[1.5px] border-slate-300 ">
                <img
                  src={form.image}
                  alt="uploaded"
                  className=" h-24 object-cover rounded-md"
                />
                {fileInfo && (
                  <div className="mb-2 text-sm text-gray-900">
                    <p>{fileInfo.name}</p>
                    <p>{(fileInfo.size / (1024 * 1024)).toFixed(2)} MB</p>
                  </div>
                )}

                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 cursor-pointer hover:scale-105"
                >
                  <CircleX size={16} />
                </button>
              </div>
            ) : (
              <>
                <label
                  htmlFor="fileUpload"
                  className="text-xs align-middle px-3 p-2 rounded-lg cursor-pointer text-gray-500  border-[1.5px] border-slate-300 hover:bg-gray-200 duration-300 block"
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
            {errors.image && (
              <p className="text-red-600 text-sm">{errors.image}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded bg-gradient-to-r from-blue-500 to-indigo-600 hover:scale-105 cursor-pointer transition text-white font-bold text-xs"
          >
            {editing ? "Update Product" : "Add Product"}
          </button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
