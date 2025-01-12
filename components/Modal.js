import React from "react";

export default function Modal({ type,title, message, onClose }) {
  // `type` can be "error" or "confirmation" to set the modal style.
  const modalStyle =
    type === "error"
      ? "bg-red-100 border-red-500 text-red-700"
      : "bg-blue-100 border-blue-500 text-blue-700";

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className={`bg-white rounded-lg shadow-lg p-6 w-96 border ${modalStyle}`}>
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <p className="text-gray-700">{message}</p>
        <div className="text-center mt-4">
          <button
            className={`px-6 py-2 font-bold rounded-lg ${
              type === "error" ? "bg-red-500 hover:bg-red-700 text-white" : "bg-blue-500 hover:bg-blue-700 text-white"
            }`}
            onClick={onClose}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
