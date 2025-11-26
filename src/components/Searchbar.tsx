import { Search } from "lucide-react";

type SearchProps = {
  onChangeText: (text: string) => void;
};

export default function Searchbar({ onChangeText }: SearchProps) {
  return (
    <div className="flex items-center bg-white shadow-sm  px-3 rounded-full transition w-60 h-8">

      
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
