process.on('uncaughtException', (err) => console.log('DB/Server notice:', err.message));
process.on('unhandledRejection', (reason) => console.log('Unhandled notice:', reason));
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Routes
const machineryRoutes = require('./routes/machineryRoutes');
const laborRoutes = require('./routes/laborRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

app.use('/api/machinery', machineryRoutes);
app.use('/api/laborers', laborRoutes);
app.use('/api/bookings', bookingRoutes);

// Server listen
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});