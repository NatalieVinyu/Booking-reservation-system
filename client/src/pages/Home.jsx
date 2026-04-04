//MAIN BOOKING LOGIC & UI FLOW
import React from 'react'
import { useState, useEffect } from "react";
import BookingList from '../components/BookingList';
import BookingForm from '../components/BookingForm';
import DatePicker from '../components/DatePicker';
import ResourceSelector from '../components/ResourceSelector';
import Slots from '../components/Slots';

const URL = "/api/bookings";

function Home() {
  const [resource, setResource] = useState("Dr. Smith");
  const [date, setDate] = useState("");
  const [slots, setSlots] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (date) fetchSlots();
  }, [date, resource]);

  //FETCH AVAILABLE SLOTS
  const fetchSlots = async () => {
    if (!date) return;

    try {
    const res = await fetch(`${URL}/slots?resource=${encodeURIComponent(resource)}&date=${date}`);

    console.log("Response status:", res.status);

    const data = await res.json();
    console.log("Data:", data);

    if (!res.ok) {
      console.error("Server error:", data);
      setSlots([]);
      return;
    }

    setSlots(Array.isArray(data.availableSlots) ? data.availableSlots : []);

    } catch (error) {
      console.error("FETCH ERROR:", error);
      setSlots([]);
      alert('Failed to load slots')
    }
  };

  return (
    <div className='p-6 max-w-xl mx-auto bg-white shadow rounded'>
      <h1 className='text-2xl font-bold mb-4'>Vet Appointment Booking</h1>

      {/* RESOURCE SELECTOR */}
      <ResourceSelector 
        resource={resource}
        setResource={setResource} 
        clearSlots={() => {
          setSlots([]);
          setSelectedTime("");
        }}
        />

      {/* DATE PICKER */}
      <DatePicker
        date={date}
        setDate={setDate}
        clearSlots={() => {
          setSlots([]);
          setSelectedTime("");
        }}
        />

      {/* FETCH SLOTS 
      <button 
        onClick={fetchSlots} 
        className='w-full bg-blue-500 text-white p-2 mb-4'>
          Check Availability
      </button>*/}

      {/* SLOTS */}
      <Slots
        slots={slots}
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
        date={date} 
      />

      {selectedTime && (
        <BookingForm 
          resource={resource}
          date={date}
          selectedTime={selectedTime}
          onSuccess={() => {
            fetchSlots();
            setSelectedTime("");
            setRefreshKey(k => k + 1)
          }}
        />
      )}

      <BookingList refreshKey={refreshKey} />

    </div>
  );
}

export default Home;
