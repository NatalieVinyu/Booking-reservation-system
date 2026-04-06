import React from 'react'

//LIST OF AVAILABLE VETS (DATA SOURCE FOR DROPDOWN)
const vets = [
  { name: "Dr. Smith", role: "General Veterinarian" },
  { name: "Dr. Patel", role: "Surgery Specialist" },
  { name: "Dr. Adams", role: "Dermatology Specialist"},
];

function ResourceSelector({ resource, setResource, clearSlots }) {

  //HANDLES CHANGE WHEN USER SELECTS A DIFFERENT VET
  const handleChange = (e) => {
    const newResource = e.target.value;

    setResource(newResource); //UPDATE SELECTED VET

    //RESET SLOTS + SELECTED TIME WHEN RESOURCE CHANGES
    if (clearSlots) {
      clearSlots();
    }
  };

  return (
    <div className='mb-3'>
      {/* LABEL FOR DROPDOWN */}
      <label className='block mb-4 font-medium'>Select Vet</label>

      {/* DROPDOWN MENU FOR SELECTING VET */}
      <select
        value={resource}
        onChange={handleChange}
        className='w-full p-2 bg-white border border-gray-300 rounded-lg text-gray-500 outline-none'>
          {/* LOOP THROUGH VETS ARRAY TO DISPLAY OPTIONS */}
          {vets.map((vet) => (
            <option key={vets.name} value={vets.name}>
              {/* DISPLAY NAME AND ROLE */}
              {vet.name} - {vet.role}
            </option>
          ))}
        </select>
    </div>
  );
}

export default ResourceSelector
