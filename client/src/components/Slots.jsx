import React from 'react'
import { useState } from 'react';

const allSlots = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"];

function Slots({ slots, selectedTime, setSelectedTime, date }) {
  const isLoading = date && slots === null;

  return (
    <div className='mb-6'>

      {/* STATUS TEXT ONLY */}
      {!date && <p className='text-gray-400 mb-2'>Select a date</p>}
      {isLoading && <p className='text-gray-400 mb-2'>Loading..</p>}
      {date && Array.isArray(slots) && slots.length === 0 && (
        <p className='text-gray-500 mb-2'>No slots available</p>
      )}

      {/* ALWAYS RENDER GRID */}
      <div className='grid grid-cols-3 gap-3'>
        {allSlots.map((slot) => {
          const isAvailable = Array.isArray(slots) && slots.includes(slot);
          const isDisabled = !date || !isAvailable;

          return (
            <button
              key={slot}
              disabled={isDisabled}
              onClick={() => setSelectedTime(slot)}
              className={`p-3 border rounded-lg ${selectedTime === slot ? "bg-blue-600 text-white" : ""} ${isDisabled ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "hover:bg-gray-100"}`}>
                {slot}
              </button>
          )
        })}
      </div>
    </div>
  );
}

export default Slots
