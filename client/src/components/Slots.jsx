import React from 'react'

function Slots({ slots, selectedTime, setSelectedTime, date }) {
  if (!date) return null;
  if (!Array.isArray(slots)) {
    return <p className='text-red-500'>Invalid slots data</p>
  }
  if (slots.length === 0) {
    return <p className='mb-4 text-gray-500'>No slots available</p>
  }

  return (
    <div className='flex flex-wrap gap-2 mb-4'>
      {slots.map((slot) => (
        <button
          key={slot}
          onClick={() => setSelectedTime(slot)}
          className={`p-2 border rounded ${selectedTime === slot ? "bg-green-500 text-white" : "" }`}>
            {slot}
          </button>
      ))}
    </div>
  );
}

export default Slots
