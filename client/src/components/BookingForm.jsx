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

    alert(data.message);

    // RESET FORM
    setName("");
    setEmail("");

    //NOTIFY PARENT (REFRESH SLOTS, CLEAR SELECTION)
    if (onSuccess) onSuccess();

  } catch (error) {
    console.error(error);
    alert("Server error");
  }
  };

  return (
    <div className='mt-4'>
      <input 
        placeholder='Your Name'
        value={name}
        onChange={(e) => setName(e.target.value)}
        className='w-full p-2 border mb-2' />

      <input 
        placeholder='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className='w-full p-2 border mb-2' />

      <button 
        onClick={handleBooking}
        disabled={!name || !email}
        className='w-full bg-green-600 text-white p-2 disabled:bg-gray-400'>
          Book Appointment at {selectedTime}
      </button>
    </div>
  )
}

export default BookingForm
