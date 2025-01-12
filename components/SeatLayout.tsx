import React from "react";
import Seat from "./Seat";

interface Seat {
  id: string;
  type: "Silver" | "Gold" | "Platinum";
  price: number;
}

interface SeatLayoutProps {
  seats: Seat[];
  selectedSeats: Seat[];
  onSeatClick: (seat: Seat) => void;
}

export default function SeatLayout({ seats, selectedSeats, onSeatClick }: SeatLayoutProps) {
  const isSelected = (seatId: string) => selectedSeats.some((s) => s.id === seatId);

  return (
    <div className="p-4 bg-gray-800 rounded">
      <div className="grid grid-cols-10 gap-2">
        {seats.map((seat) => (
          <Seat
            key={seat.id}
            id={seat.id}
            type={seat.type}
            price={seat.price}
            isSelected={isSelected(seat.id)}
            onClick={() => onSeatClick(seat)}
          />
        ))}
      </div>
      <div className="screen"></div>
      <div className="text-center mt-4 font-bold text-white">SCREEN</div>
    </div>
  );
}
