import React from 'react';
import { useState } from "react";

// BACKEND API ENDPOINT
const URL = "/api/bookings";

// HELPER FUNCTION TO ADD 30 MINUTES TO SELECTED TIME
const add30Minutes = (time) => {
    const [hour, min] = time.split(":").map(Number);
    const date = new Date();
    date.setHours(hour, min + 30);
    return date.toTimeString().slice(0, 5);
  };

function BookingForm({ resource, date, selectedTime, onSuccess }) {
  // STATE FOR USER INPUT
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // HANDLE BOOKING SUBMISSION
  const handleBooking = async () => {
  if (!selectedTime) return alert("Select a time slot");

  try {
    // SEND POST REQUEST TO BACKEND
    const res = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        resource,
        date,
        startTime: selectedTime,
        endTime: add30Minutes(selectedTime),
        name,
        email,
      }),
    });

    const data = await res.json();

    // HANDLE SERVER ERRORS
    if (!res.ok) {
      return alert(data.message || "Booking failed");
    }

    // RESET FORM INPUTS
    setName("");
    setEmail("");

    // NOTIFY PARENT COMPONENT (REFRESH SLOTS, CLEAR SELECTION)
    if (onSuccess) onSuccess();

    // CONFIRM SUCCESS
    alert(data.message);
    
  } catch (error) {
    console.error(error);
    alert("Server error");
  }
  };

  return (
    <div className='space-y-3'>
      {/* NAME INPUT */}
      <input 
        placeholder='Full Name and Surname'
        value={name}
        onChange={(e) => setName(e.target.value)}
        className='w-full p-3 border rounded-xl border-gray-400 outline-none focus:ring-2 focus:ring-blue-400' />

      {/* EMAIL INPUT */}
      <input 
        placeholder='Email Address'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className='w-full p-3 border rounded-xl border-gray-400 outline-none focus:ring-2 focus:ring-blue-400' />

      {/* CONFIRM BOOKING BUTTON */}
      <button 
        onClick={handleBooking}
        disabled={!name || !email} // DISABLE UNTIL BOTH FIELDS ARE FILLED
        className='w-full p-3 border border-gray-400 bg-gray-100 rounded-lg hover:bg-green-600 hover:text-white transition disabled:bg-gray-400'>
          Confirm Booking
      </button>
    </div>
  )
}

export default BookingForm
