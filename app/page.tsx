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

  const handleBooking = () => {
    if (selectedSeats.length > 0) {
      alert(
        `Booking Confirmed!\n\nYou have booked the following seats:\n${selectedSeats
          .map((seat) => seat.id)
          .join(", ")}\n\nTotal Cost: ₹${selectedSeats.reduce(
          (sum, seat) => sum + seat.price,
          0
        )}`
      );
      setSelectedSeats([]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Movie: Master (PVR) - Tamil</h1>
        <p className="text-lg text-gray-600">Pick your seats and enjoy the movie!</p>
      </div>

      {/* Legend */}
      <div className="max-w-2xl mx-auto mb-4 text-center">
        <div className="flex justify-between text-sm mx-auto max-w-sm">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span>Platinum</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-yellow-500 rounded"></div>
            <span>Gold</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gray-500 rounded"></div>
            <span>Silver</span>
          </div>
        </div>
      </div>

      {/* Content Layout */}
      <div className="flex flex-col lg:flex-row justify-center gap-12 relative">
        {/* Seat Layout */}
        <div className="flex-1 max-w-2xl bg-white shadow-md p-6 rounded-lg">
          <SeatLayout
            seats={seats}
            selectedSeats={selectedSeats}
            onSeatClick={handleSeatClick}
          />
        </div>

        {/* Booking Summary */}
        {selectedSeats.length > 0 && (
          <div className="max-w-sm bg-white shadow-md p-6 rounded-lg">
            <BookingSummary selectedSeats={selectedSeats} totalCost={totalCost} />
          </div>
        )}

        {/* Book Now Button */}
        {selectedSeats.length > 0 && (
          <div className="absolute bottom-[-50px] left-1/2 transform -translate-x-1/2">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-6 text-base font-bold rounded-lg"
              onClick={handleBooking}
            >
              Book Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
