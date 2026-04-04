const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');

//MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//ROUTES
const bookingsRoutes = require('./routes/bookings');
app.use('/api/bookings', bookingsRoutes);

//TEST ROUTES
app.post('/data', (req, res) => {
  res.send(`Received JSON data: ${JSON.stringify(req.body)}`);
});

//FORM DATA
app.post('/submit-form', (req, res) => {
  res.send(`Form data: ${JSON.stringify(req.body)}`);
})

//START SERVER
app.listen(3000, () => {
  console.log('Server is running on port http://localhost:3000');
});