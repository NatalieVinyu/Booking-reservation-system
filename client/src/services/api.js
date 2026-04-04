// SERVICES/API.JS
import React from 'react'

const URL = "/api/bookings";

export const getBookings = () => fetch(URL).then(r => r.json());

export const getSlots = (resource, date) =>
  fetch(`${URL}/slots?resource=${encodeURIComponent(resource)}&date=${date}`)
.then(r => r.json());

export const createBooking = (body) =>
  fetch(URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }).then(r => r.json());

  export const deleteBooking = (id) =>
    fetch(`${URL}/${id}`, { method: "DELETE" }).then(r => r.json());

function api() {
  return (
    <div>
      
    </div>
  )
}

export default api
