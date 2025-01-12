import React from "react";

interface Seat {
  id: string;
  type: "Silver" | "Gold" | "Platinum";
  price: number;
}

interface BookingSummaryProps {
  selectedSeats: Seat[];
  totalCost: number;
}

export default function BookingSummary({ selectedSeats, totalCost }: BookingSummaryProps) {
  return (
    <div className="text-center text-black p-4 rounded">
      <h2 className="text-xl font-bold mb-4">Booking Summary</h2>
      <ul className="mb-4">
        {selectedSeats.map((seat) => (
          <li key={seat.id} className="mb-2">
            Seat {seat.id}: ₹{seat.price}
          </li>
        ))}
      </ul>
      <p className="mb-2 font-bold">Total Price: ₹{totalCost}</p>
    </div>
  );
}
