import React from 'react'

const vets = [
  { name: "Dr. Smith", role: "General Veterinarian" },
  { name: "Dr. Patel", role: "Surgery Specialist" },
  { name: "Dr. Adams", role: "Dermatology Specialist"},
];

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
      <label className='block mb-4 font-medium'>Select Vet</label>

      <select
        value={resource}
        onChange={handleChange}
        className='w-full p-2 bg-white border border-gray-300 rounded-lg text-gray-500 outline-none'>
          {vets.map((vet) => (
            <option key={vets.name} value={vets.name}>
              {vet.name} - {vet.role}
            </option>
          ))}
        </select>
    </div>
  );
}

export default ResourceSelector
