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
<div className="m-2 flex flex-wrap justify-center gap-6 sm:gap-12">
{icons.map((icon, index) => (
<div
key={index}
className="flex flex-col items-center hover:scale-105 transition-transform cursor-pointer"
onClick={() => onSelectCategory(icon.title.toLowerCase())}
>
<img
src={icon.imageUrl}
alt={icon.title}
className="h-16 w-16 sm:h-20 sm:w-20 rounded-xl"
/>
<p className="text-xs sm:text-sm text-blue-950 font-bold mt-2 text-center">
{icon.title}
</p>
</div>
))}
</div>
);
}