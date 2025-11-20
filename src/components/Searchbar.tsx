type SearchProps = {
  iconUrl: string;
  onChangeText: (text: string) => void;
};

export default function Searchbar({iconUrl, onChangeText }: SearchProps) {
  
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      onChangeText(e.currentTarget.value); 
    }
  }

  return (
    <div className="flex justify-start bg-[#2B2A33] p-4 gap-3 w-full max-w-xl rounded-2xl">

      <input
        className="text-white flex-1 border-none outline-none bg-transparent"
        type="text"
        placeholder="Search Product"
        onChange={(e) => onChangeText(e.target.value)}
      />
    </div>
  );
}
