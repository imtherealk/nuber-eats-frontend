import React from "react";
import { useAllCategories } from "../hooks/useAllCategories";

export const Categories: React.FC = () => {
  const { data } = useAllCategories();

  return (
    <>
      {data?.allCategories.categories?.map(category => (
        <div className="flex flex-col items-center group cursor-pointer ">
          <div
            className="w-16 h-16 rounded-full bg-cover group-hover:bg-gray-100 max-w-full"
            style={{ backgroundImage: `url(${category.coverImage})` }}
          ></div>
          <span className="text-sm text-center font-medium mt-1">
            {category.name}
          </span>
        </div>
      ))}
    </>
  );
};
