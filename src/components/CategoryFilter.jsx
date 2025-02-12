import React from "react";

export default function CategoryFilter({ categories, selected, onSelect }) {
  return (
    <div className="flex gap-4 p-4">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat.id)}
          className={`flex cursor-pointer items-center gap-2 px-4 py-2 rounded-xl transition-all hover:scale-110 ease-in-out duration-300 delay-25 border-[1px] border-zinc-200
          ${
            selected === cat.id
              ? `${cat.color} font-semibold shadow-md`
              : "bg-gray-100 text-gray-400 opacity-70"
          }
        `}
        >
          {cat.icon}
          <span>{cat.name}</span>
        </button>
      ))}
    </div>
  );
}
