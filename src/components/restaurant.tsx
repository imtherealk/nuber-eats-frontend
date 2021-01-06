import React from "react";

interface IRestaurantProps {
  id: number;
  coverImage: string;
  name: string;
  categoryName?: string;
}
export const Restaurant: React.FC<IRestaurantProps> = ({
  coverImage,
  name,
  categoryName,
}) => {
  return (
    <>
      <div
        className="bg-cover bg-center bg-red-500 py-24 mb-3"
        style={{ backgroundImage: `url(${coverImage})` }}
      ></div>
      <h3 className="text-lg font-medium">{name}</h3>
      <span>{categoryName}</span>
    </>
  );
};
