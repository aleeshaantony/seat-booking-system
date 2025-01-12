import React from "react";

interface SeatProps {
  id: string;
  type: "Silver" | "Gold" | "Platinum";
  price: number;
  isSelected: boolean;
  onClick: () => void;
}

export default function Seat({ id, type, price, isSelected, onClick }: SeatProps) {
  
  const baseStyle = "w-10 h-10 flex items-center justify-center rounded-md cursor-pointer";
  const seatTypeStyles = {
    Silver: "bg-gray-400 text-black",
    Gold: "bg-yellow-400 text-black",
    Platinum: "bg-blue-500 text-black",
  };
  const selectedStyle = isSelected
  ? "bg-gray-500 text-white"
  : seatTypeStyles[type];


  return (
    <button
    className={`${baseStyle} ${selectedStyle}`}
      onClick={onClick}
      title={`Seat: ${id}, Price: ₹${price}`}
    >
      {id}
    </button>
  );
}
