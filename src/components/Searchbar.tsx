type SearchProps = {
  onChangeText: (text: string) => void;
};

export default function Searchbar({onChangeText }: SearchProps) {
  
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      onChangeText(e.currentTarget.value); 
    }
  }

  return (
    <div className="flex justify-start bg-gray-400 p-3 w-full max-w-xl m-2 rounded">

      <input
        className="text-white flex-1 border-none outline-none bg-transparent"
        type="text"

        placeholder="Search Product"
        onChange={(e) =>
           {onChangeText(e.target.value);
           console.log(e);}}
      />
      
    </div>
  );
}
