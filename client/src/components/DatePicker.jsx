import React from 'react'

function DatePicker({ date, setDate, clearSlots }) {

  const today = new Date().toISOString().split("T")[0];

  const isWeekend = (dateStr) => {
    const d = new Date(dateStr);
    const day = d.getDay();
    return day === 0 || day === 6;
  }

  const handleChange = (e) => {
    const newDate = e.target.value;

    if (isWeekend(newDate)) {
      alert("Clinic is closed on weekends");
      return;
    }

    setDate(newDate);

    //RESET SLOTS + SELECTED TIME WHEN DATE CHANGES
    if (clearSlots) {
      clearSlots();
    }
  };

  return (
    <div className='mb-3'>
      <label className='block mb-4 font-medium'>Select Date</label>

      <input 
        type="date"
        min={today}
        value={date}
        onChange={handleChange}
        className='w-full p-2 bg-white border border-gray-300 rounded text-gray-500 outline-none' />
    </div>
  );
}

export default DatePicker