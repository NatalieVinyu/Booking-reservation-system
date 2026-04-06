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
  const [slots, setSlots] = useState([null]);
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
      setSlots([null]);
      alert('Failed to load slots')
    }
  };

  return (
    <div className='min-h-screen bg-gray-50 p-6'>
      <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6'>

      <div className='md:col-span-2 bg-white shadow-xl rounded-2xl p-6'>
        <h1 className='text-2xl font-bold mb-6'>CareFirst Veterinary Appointment Booking</h1>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/* RESOURCE SELECTOR */}
        <div className='mb-6 bg-gray-50 p-4 rounded-xl'>
          <ResourceSelector 
            resource={resource}
            setResource={setResource} 
            clearSlots={() => {
              setSlots([]);
              setSelectedTime("");
            }}
          />
        </div>
        
        {/* DATE PICKER */}
        <div className='mb-6 bg-gray-50 p-4 rounded-xl'>
          <DatePicker
            date={date}
            setDate={setDate}
            clearSlots={() => {
              setSlots([]);
              setSelectedTime("");
            }}
          />
        </div>
      </div>
      
        {/* SLOTS */}
      <div className='mb-6 bg-gray-50 p-4 rounded-xl'>
        <h2 className='font-semibold mb-2'>Available Slots</h2>
        <Slots
          slots={slots}
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
          date={date} 
        />
      </div>
        
        {/* BOOKING FORM */}
        {selectedTime && (
          <div className='border-t border-gray-300 pt-6'>
            <h2 className='font-semibold mb-2'>Your Details</h2>

            <BookingForm 
              resource={resource}
              date={date}
              selectedTime={selectedTime}
              onSuccess={() => {
                setSelectedTime("");
                setDate("");
                setResource("Dr.Smith");
                setRefreshKey(k => k + 1)
                
                //RESET SLOTS PROPERLY
                setSlots(null)

                //REFRESH BOOKINGS LIST
                setRefreshKey(k => k + 1);
              }}
            />
          </div>
        )}

      </div>
      
      {/* BOOKING LIST */}
      <div className='bg-white shadow-xl rounded-2xl p-6 h-fit'>

        <h2 className='text-xl font-bold mb-4'>Your Bookings</h2>
        <BookingList refreshKey={refreshKey} />
      </div>

     </div>
    </div>
  );
}

export default Home;
