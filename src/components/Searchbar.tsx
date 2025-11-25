import { Search } from "lucide-react";

type SearchProps = {
  onChangeText: (text: string) => void;
};

export default function Searchbar({ onChangeText }: SearchProps) {
  return (
    <div className="flex items-center bg-white shadow-sm py-2 px-4 rounded-full border focus-within:ring-2 focus-within:ring-blue-400 transition">

      
      {/* searchbar input*/}
      <input
        className="flex-1 bg-transparent outline-none text-sm placeholder-gray-600"
        type="text"
        placeholder="Search Product"
        onChange={(e) => onChangeText(e.target.value)}
      />

      {/* search icon */}
      <Search className="text-gray-600 w-4 h-4 cursor-pointer" />
    </div>
  );
}
