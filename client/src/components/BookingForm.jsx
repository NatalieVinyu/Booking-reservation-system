import React from 'react';
import { useState } from "react";

const URL = "/api/bookings";

const add30Minutes = (time) => {
    const [hour, min] = time.split(":").map(Number);
    const date = new Date();
    date.setHours(hour, min + 30);
    return date.toTimeString().slice(0, 5);
  };

function BookingForm({ resource, date, selectedTime, onSuccess }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  //CREATE BOOKING
  const handleBooking = async () => {
  if (!selectedTime) return alert("Select a time slot");

  try {
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

    if (!res.ok) {
      return alert(data.message || "Booking failed");
    }

    // RESET FORM
    setName("");
    setEmail("");

    //NOTIFY PARENT (REFRESH SLOTS, CLEAR SELECTION)
    if (onSuccess) onSuccess();

    alert(data.message);
    
  } catch (error) {
    console.error(error);
    alert("Server error");
  }
  };

  return (
    <div className='space-y-3'>
      <input 
        placeholder='Full Name and Surname'
        value={name}
        onChange={(e) => setName(e.target.value)}
        className='w-full p-3 border rounded-xl border-gray-400 outline-none focus:ring-2 focus:ring-blue-400' />

      <input 
        placeholder='Email Address'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className='w-full p-3 border rounded-xl border-gray-400 outline-none focus:ring-2 focus:ring-blue-400' />

      <button 
        onClick={handleBooking}
        disabled={!name || !email}
        className='w-full p-3 border border-gray-400 bg-gray-100 rounded-lg hover:bg-green-600 hover:text-white transition disabled:bg-gray-400'>
          Confirm Booking
      </button>
    </div>
  )
}

export default BookingForm
