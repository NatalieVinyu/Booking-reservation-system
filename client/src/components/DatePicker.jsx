import React from 'react'

function DatePicker({ date, setDate, clearSlots }) {
  const handleChange = (e) => {
    const newDate = e.target.value;

    setDate(newDate);

    //RESET SLOTS + SELECTED TIME WHEN DATE CHANGES
    if (clearSlots) {
      clearSlots();
    }
  };

  return (
    <div className='mb-3'>
      <label className='block mb-1 font-medium'>Select Date</label>

      <input 
        type="date"
        value={date}
        onChange={handleChange}
        className='w-full p-2 border rounded' />
    </div>
  );
}

export default DatePicker