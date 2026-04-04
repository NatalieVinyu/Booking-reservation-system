import React from 'react';
import { useEffect, useState } from 'react';

const URL = "/api/bookings";

function BookingList({ refreshKey }) {
  useEffect(() => {
    fetchBookings();
  }, [refreshKey]);

  const [bookings, setBookings] = useState([]);

  //FETCH ALL BOOKINGS
  const fetchBookings = async () => {
  try {
    const res = await fetch('/api/bookings');
    const data = await res.json();

    console.log("Bookings:", data)
    setBookings(data);
  } catch (error) {
    console.error("Full error:", error);
    alert(`Failed to load bookings: ${error.message}`);
  }
};

  //DELETE BOOKING
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${URL}/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        return alert("Delete failed");
      }

      //REFRESH LIST AFTER DELETE
      fetchBookings();
    } catch (error) {
      console.error(error);
      alert("Error deleting booking");
    }
  };

  return (
    <div className='mt-6'>
      <h2 className='text-xl font-bold mb-3'>Bookings</h2>

      {bookings.length === 0 && <p>No bookings yet</p>}

      {bookings.map((booking) => (
        <div key={booking.id} className='border p-3 mb-2 flex justify-between items-center'>
          <div>
            <p><strong>{booking.resource}</strong></p>
            <p>{booking.date} at {booking.startTime}</p>
            <p>{booking.name}</p>
          </div>

          <button onClick={() => handleDelete(booking.id)} className='bg-red-500 text-white px-3 py-1'>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default BookingList;
