//ROUTES/BOOKING.JS

const express = require('express');
const router = express.Router();
const bookings = require('../data/store');

//CREATE A NEW BOOKING
router.post('/', (req, res) => {
  const { resource, date, startTime, endTime, name, email } = req.body;

  //VALIDATE THE INPUT
  if (!resource || !date || !startTime || !endTime || !name || !email) {
    return res.status(400).send('All fields are required');
  }

  //CHECK FOR CONFLICTS
  const conflict = bookings.find(booking =>
    booking.resource === resource &&
    booking.date === date &&
    startTime < booking.endTime && 
    endTime > booking.startTime
  );

  if (conflict) {
    return res.status(400).send('Time slot already booked')
  }

  const newBooking = {
    id: Date.now().toString(),
    resource,
    date,
    startTime,
    endTime,
    name,
    email
  };

  bookings.push(newBooking);

  res.send({message: 'Booking successful', booking: newBooking })
});

//GET AVAILABLE SLOTS FOR A RESOURCE AND DATE
router.get('/slots', (req, res) => {
  const { resource, date } = req.query;

  if (!resource || !date) {
    return res.status(400).send('Resource and date are required')
  }

  const allSlots = [
    "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"
  ];

  //FIND ALL BOOKINGS FOR THIS RESOURCE + DATE
    const booked = bookings
    .filter(bookings => bookings.resource === resource && bookings.date === date)
    .map(bookings => bookings.startTime);

    //FILTER OUT BOOKED SLOTS
    const availableSlots = allSlots.filter(slot => !booked.includes(slot))

    res.json({ resource, date, availableSlots })
})

//GET ALL BOOKINGS
router.get('/', (req, res) => {
  res.json(bookings);
});

//GET BOOKINGS FOR SPECIFIC DATE AND RESOURCE
router.get('/:date/:resource', (req, res) => {
  const { date, resource } = req.params;

  const filteredBookings = bookings.filter(booking => booking.date === date && booking.resource === resource);
  
  res.json(filteredBookings);
});

//DELETE A BOOKING BY ID
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  const index = bookings.findIndex(booking => booking.id === id);

  if (index === -1) {
    return res.status(404).send('Booking not found');
  }

  const deleteBooking = bookings.splice(index, 1);

  res.send({
    message: 'Booking deleted successfully',
    booking: deleteBooking[0]
  });
});

module.exports = router;
