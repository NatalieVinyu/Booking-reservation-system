import React from 'react';
import { useEffect, useState } from 'react';

//BACKEND API ENDPOINT
const URL = "https://booking-reservation-system-an1k.onrender.com/api/bookings";

function BookingList({ refreshKey }) {
  //FETCH BOOKING WHEN COMPONENT WHEN COMPONENT MOUNTS OR refreshKey CHANGES
  useEffect(() => {
    fetchBookings();
  }, [refreshKey]);

  const [bookings, setBookings] = useState([]);

  //FETCH ALL BOOKINGS FROM BACKEND
  const fetchBookings = async () => {
  try {
    const res = await fetch('/api/bookings');
    const data = await res.json();

    console.log("Bookings:", data)
    setBookings(data); // UPDATE STATE WITH BOOKINGS
  } catch (error) {
    console.error("Full error:", error);
    alert(`Failed to load bookings: ${error.message}`);
  }
};

  //DELETE A BOOKING BY ID
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${URL}/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        return alert("Delete failed");
      }

      //REFRESH BOOKINGS AFTER DELETE
      fetchBookings();
    } catch (error) {
      console.error(error);
      alert("Error deleting booking");
    }
  };

  return (
    <div className='mt-6'>
      <h2 className='text-xl mb-3'>Bookings</h2>

      <div className='space-y-3'>
        {/* SHOW MESSAGE IF NO BOOKINGS */}
        {bookings.length === 0 && (<p>No bookings yet</p>)}

        {/* RENDER EACH BOOKING */}
        {bookings.map((booking) => (
        <div key={booking.id} className='border rounded-xl border-gray-400 p-3 mb-2 flex justify-between items-center'>
          <div>
            <p><strong>{booking.resource}</strong></p>
            <p className='text-gray-400'>{booking.date} at {booking.startTime}</p>
            <p>{booking.name}</p>
          </div>

          {/* DELETE BUTTON */}
          <button onClick={() => handleDelete(booking.id)} className='bg-red-500 rounded-xl text-white px-3 py-1'>Delete</button>
        </div>
        ))}
      </div>
    </div>
  );
}

export default BookingList;
