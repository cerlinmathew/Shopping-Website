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
    <div className="m-2 flex flex-wrap justify-center gap-12">
      {icons.map((icon, index) => (
        <div
          key={index}
          className="flex flex-col items-center hover:scale-105 transition-transform cursor-pointer"
          onClick={() => onSelectCategory(icon.title.toLowerCase())}
        >
          <div>
            <img
              src={icon.imageUrl}
              alt={icon.title}
              className="h-18 w-18 rounded-xl"
            />
          </div>
          <p className="text-sm text-blue-950 font-bold mt-2">
            {icon.title}
          </p>
        </div>
      ))}
    </div>
  );
}
