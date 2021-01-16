import React from "react";
import { Link } from "react-router-dom";

interface IRestaurantProps {
  id: string;
  coverImage: string;
  name: string;
  categoryName?: string;
}
export const Restaurant: React.FC<IRestaurantProps> = ({
  id,
  coverImage,
  name,
  categoryName,
}) => {
  return (
    <Link to={`/restaurants/${id}`}>
      <div className="flex flex-col">
        <div
          className="bg-cover bg-center py-24 mb-3"
          style={{ backgroundImage: `url(${coverImage})` }}
        ></div>
        <h3 className="text-xl font-bold font-uber">{name}</h3>
        <span className="text-xs font-uber opacity-50 border-t mt-3 py-2 border-gray-300">
          {categoryName}
        </span>
      </div>
    </Link>
  );
};
