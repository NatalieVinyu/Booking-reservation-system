import React from 'react'

function ResourceSelector({ resource, setResource, clearSlots }) {
  const handleChange = (e) => {
    const newResource = e.target.value;

    setResource(newResource);

    //RESET SLOTS + SELECTED TIME WHEN RESOURCE CHANGES
    if (clearSlots) {
      clearSlots();
    }
  };

  return (
    <div className='mb-3'>
      <label className='block mb-1 font-medium'>Select Vet</label>

      <select
        value={resource}
        onChange={handleChange}
        className='w-full p-2 border rounded'>
          <option>Dr. Smith</option>
          <option>Dr. Patel</option>
        </select>
    </div>
  );
}

export default ResourceSelector
