//ROUTES/BOOKING.JS
const express = require('express');
const router = express.Router();
const store = require('../data/store');

//GET AVAILABLE SLOTS FOR A RESOURCE AND DATE
router.get('/slots', (req, res) => {
  const { resource, date } = req.query;

  if (!resource || !date) {
    return res.status(400).json({ message: 'Resource and date are required' })
  }

  const allSlots = [
    "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"
  ];

  //FIND ALL BOOKINGS FOR THIS RESOURCE + DATE
    const booked = store.bookings
    .filter(b => b.resource === resource && b.date === date)
    .map(b => b.startTime);

    //FILTER OUT BOOKED SLOTS
    const availableSlots = allSlots.filter(slot => !booked.includes(slot))

    res.json({ resource, date, availableSlots })
})

//CREATE A NEW BOOKING
router.post('/', (req, res) => {
  const { resource, date, startTime, endTime, name, email } = req.body;

  //VALIDATE THE INPUT
  if (!resource || !date || !startTime || !endTime || !name || !email) {
    return res.status(400).json('All fields are required');
  }

  //CHECK FOR CONFLICTS
  const conflict = store.bookings.find(booking =>
    booking.resource === resource &&
    booking.date === date &&
    startTime < booking.endTime && 
    endTime > booking.startTime
  );

  if (conflict) {
    return res.status(400).json('Time slot already booked')
  }

  //CREATE BOOKING
  const newBooking = {
    id: Date.now().toString(),
    resource,
    date,
    startTime,
    endTime,
    name,
    email
  };

  store.bookings.push(newBooking);

  res.json({message: 'Booking successful', booking: newBooking })
});

//GET ALL BOOKINGS
router.get('/', (req, res) => {
  try{
  res.json(store.bookings);
} catch (err) {
  console.error(err);
  res.status(500).json({ message: 'Server error '})
  }
});

//GET BOOKINGS FOR SPECIFIC DATE AND RESOURCE
router.get('/:date/:resource', (req, res) => {
  const { date, resource } = req.params;

  const filteredBookings = store.bookings.filter(booking => booking.date === date && booking.resource === resource);
  
  res.json(filteredBookings);
});

//DELETE A BOOKING BY ID
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  const index = store.bookings.findIndex(b => b.id === req.params.id);

  if (index === -1) 
    return res.status(404).json({ message: 'Booking not found' });
  
  const deleteBooking = store.bookings.splice(index, 1);

  res.json({
    message: 'Booking deleted successfully',
    booking: deleteBooking[0]
  });
});

module.exports = router;
