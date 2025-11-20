import React from "react";

type IconItem = {
  title: string;
  imageUrl: string;
};

type CategoryProps = {
  icons: IconItem[];
  onSelectCategory: (category: string) => void;
};

export default function Category({ icons, onSelectCategory }: CategoryProps) {
  return (
    <div className="m-6 flex flex-wrap justify-center gap-8">
      {icons.map((icon, index) => (
        <div
          key={index}
          className="flex flex-col items-center hover:scale-105 transition-transform cursor-pointer"
          onClick={() => onSelectCategory(icon.title.toLowerCase())}
        >
          <div className="bg-neutral-300 p-1 rounded-xl shadow-md hover:bg-amber-300">
            <img
              src={icon.imageUrl}
              alt={icon.title}
              className="h-18 w-18 rounded-xl"
            />
          </div>
          <p className="text-sm text-gray-300 font-bold mt-2 hover:text-gray-400">
            {icon.title}
          </p>
        </div>
      ))}
    </div>
  );
}
