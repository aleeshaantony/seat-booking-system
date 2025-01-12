"use client";
import React, { useState, useEffect } from "react";
import SeatLayout from "../components/SeatLayout";
import BookingSummary from "../components/BookingSummary";

interface Seat {
  id: string;
  type: "Silver" | "Gold" | "Platinum";
  price: number;
}

const ROWS = 6;
const COLUMNS = 10;

const generateSeats = (): Seat[] => {
  const seats: Seat[] = [];
  for (let row = 0; row < ROWS; row++) {
    const tier = row < 2 ? "Platinum" : row < 4 ? "Gold" : "Silver";
    const price = tier === "Silver" ? 100 : tier === "Gold" ? 150 : 200;
    for (let col = 1; col <= COLUMNS; col++) {
      seats.push({
        id: `${String.fromCharCode(65 + row)}${col}`,
        type: tier,
        price,
      });
    }
  }
  return seats;
};

export default function Page() {
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [error, setError] = useState("");
  const seats = generateSeats();

  const handleSeatClick = (seat: Seat) => {
    const isAlreadySelected = selectedSeats.some((s) => s.id === seat.id);

    if (isAlreadySelected) {
      // Deselect the seat
      setSelectedSeats(selectedSeats.filter((s) => s.id !== seat.id));
    } else {
      if (selectedSeats.length >= 8) {
        setError("You can only select up to 8 seats.");
        return;
      }
      // Select the seat
      setSelectedSeats([...selectedSeats, seat]);
      setError(""); // Clear the error
    }
  };

  const totalCost = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);

  useEffect(() => {
    if (error) {
      alert(error); // Trigger alert when error changes
    }
  }, [error]);

  return (
    <div className="min-h-screen bg-white-900 text-black p-6">
      <div className="mb-6 text-center">
        <h2 className="text-xl font-bold mb-4 mt-4">  Movie :  Master (PVR) - Tamil</h2>
      </div>

      <div className="text-center mb-4">
        <div className="flex justify-center flex-wrap gap-4">
          <SeatLayout seats={seats} selectedSeats={selectedSeats} onSeatClick={handleSeatClick} />
        </div>
      </div>

      <div className="text-center text-lg mt-6">
        <BookingSummary selectedSeats={selectedSeats} totalCost={totalCost} />
      </div>
    </div>
  );
}
