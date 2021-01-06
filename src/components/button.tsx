import React from "react";

interface IButtonProps {
  loading: boolean;
  canClick: boolean;
  actionText: string;
}

export const Button: React.FC<IButtonProps> = ({
  loading,
  canClick,
  actionText,
}) => {
  return (
    <button
      className={`rounded-md focus:outline-none text-lg font-medium text-white px-5 py-3 transition-colors ${
        canClick
          ? "bg-lime-600 hover:bg-lime-700"
          : "bg-trueGray-300 pointer-events-none"
      }`}
    >
      {loading ? "Loading" : actionText}
    </button>
  );
};
