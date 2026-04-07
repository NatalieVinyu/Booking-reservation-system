// SERVICES/API.JS
const URL = import.meta.env.VITE_API_URL || "https://booking-reservation-system-an1k.onrender.com/api";

export const getBookings = () => fetch(`${URL}/bookings`).then(r => r.json());

export const getSlots = (resource, date) =>
  fetch(`${URL}/slots?resource=${encodeURIComponent(resource)}&date=${date}`)
.then(r => r.json());

export const createBooking = (body) =>
  fetch(`${URL}/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }).then(r => r.json());

  export const deleteBooking = (id) =>
    fetch(`${URL}/bookings/${id}`, { method: "DELETE" }).then(r => r.json());

