import React from 'react'
import { useState } from 'react';

//ALL POSSIBLE TIME SLOTS
const allSlots = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"];

function Slots({ slots, selectedTime, setSelectedTime, date }) {
  // CHECK IF SLOTS ARE STILL LOADING
  const isLoading = date && slots === null;

  return (
    <div className='mb-6'>

      {/* STATUS TEXT ONLY */}
      {!date && <p className='text-gray-400 mb-2'>Select available slot</p>}
      {isLoading && <p className='text-gray-400 mb-2'>Loading..</p>}
      {date && Array.isArray(slots) && slots.length === 0 && (
        <p className='text-gray-500 mb-2'>No slots available</p>
      )}

      {/* SLOT BUTTON GRID */}
      <div className='grid grid-cols-3 gap-3'>
        {allSlots.map((slot) => {
          const isAvailable = Array.isArray(slots) && slots.includes(slot); // CHECK IF SLOT IS FREE
          const isDisabled = !date || !isAvailable; // DISABLE IF NO DATE OR SLOT UNAVAILABLE

          return (
            <button
              key={slot}
              disabled={isDisabled} // DISABLE UNAVAILABLE BUTTONS
              onClick={() => setSelectedTime(slot)} // SELECT SLOT ON CLICK
              className={`p-3 bg-white border rounded-lg border-none ${selectedTime === slot ? "bg-blue-700 text-black" : ""} ${isDisabled ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "hover:bg-blue-600"}`}>
                {slot} {/* DISPLAY SLOT TIME */}
              </button>
          )
        })}
      </div>
    </div>
  );
}

export default Slots
