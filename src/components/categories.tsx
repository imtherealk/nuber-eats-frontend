import React from "react";
import { Link } from "react-router-dom";
import { useAllCategories } from "../hooks/useAllCategories";

export const Categories: React.FC = () => {
  const { data } = useAllCategories();

  return (
    <>
      {data?.allCategories.categories?.map(category => (
        <Link to={`/category/${category.slug}`} key={category.id}>
          <div className="flex flex-col items-center group cursor-pointer ">
            <div
              className="w-16 h-16 rounded-full bg-cover group-hover:bg-gray-100 max-w-full"
              style={{ backgroundImage: `url(${category.coverImage})` }}
            ></div>
            <span className="font-uber text-sm text-center font-bold mt-1">
              {category.name}
            </span>
          </div>
        </Link>
      ))}
    </>
  );
};
