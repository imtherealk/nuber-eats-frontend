import React from "react";

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
    <div className="flex flex-col">
      <div
        className="bg-cover bg-center py-24 mb-3"
        style={{ backgroundImage: `url(${coverImage})` }}
      ></div>
      <h3 className="text-xl font-medium">{name}</h3>
      <span className="text-xs opacity-50 border-t mt-3 py-2 border-gray-300">
        {categoryName}
      </span>
    </div>
  );
};
