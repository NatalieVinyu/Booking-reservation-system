import React from 'react'

function DatePicker({ date, setDate, clearSlots }) {

  // GET TODAYS DATE TO RESTRICT PAST DATES
  const today = new Date().toISOString().split("T")[0];

  // CHECK IF SELECTED DATE IS A WEEKEND
  const isWeekend = (dateStr) => {
    const d = new Date(dateStr);
    const day = d.getDay();
    return day === 0 || day === 6; //0 = SUNDAY, 6 = SATURDAY
  }

  // HANDLE DATE SELECTION
  const handleChange = (e) => {
    const newDate = e.target.value;

    //ALERT USER IF DATE IS ON WEEKEND
    if (isWeekend(newDate)) {
      alert("Clinic is closed on weekends");
      return;
    }

    setDate(newDate); // UPDATE SELECTED DATE

    //RESET SLOTS + SELECTED TIME WHEN DATE CHANGES
    if (clearSlots) {
      clearSlots();
    }
  };

  return (
    <div className='mb-3'>
      {/* LABEL FOR DATE PICKER */}
      <label className='block mb-4 font-medium'>Select Date</label>

      {/* DATE INPUT FIELD */}
      <input 
        type="date"
        min={today} // PREVENT SELECTING PAST DATE
        value={date}
        onChange={handleChange}
        className='w-full p-2 bg-white border border-gray-300 rounded text-gray-500 outline-none' />
    </div>
  );
}

export default DatePicker