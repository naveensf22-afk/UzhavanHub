const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'uzhavanhub_db'
});

// 1. Get laborers list
router.get('/', (req, res) => {
  res.json({
    data: [
      { skills: 'Paddy Harvesting & Planting', availability_status: 'Available', daily_wage: 650 },
      { skills: 'Tractor Driver / Machinery Operator', availability_status: 'Available', daily_wage: 800 },
      { skills: 'Weeding & Field Maintenance', availability_status: 'Available', daily_wage: 500 }
    ]
  });
});

// 2. Get all labor bookings
router.get('/bookings', (req, res) => {
  const query = 'SELECT * FROM labour_bookings ORDER BY id DESC';
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message, data: [] });
    res.json({ data: results });
  });
});

// 3. Update Booking Status (Pending -> Approved)
router.put('/bookings/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const query = 'UPDATE labour_bookings SET status = ? WHERE id = ?';
  db.query(query, [status, id], (err, result) => {
    if (err) return res.status(500).json({ success: false, message: err.message });
    res.json({ success: true, message: 'Status updated successfully' });
  });
});

// 4. Insert new labor booking with farmer name & phone
router.post('/request', (req, res) => {
  const { farmer_name, farmer_phone, work_type, laborers_needed, required_date, duration_days } = req.body;
  const formattedWork = farmer_name ? `${work_type} (${farmer_name} - ${farmer_phone})` : work_type;

  const query = `
    INSERT INTO labour_bookings (farmer_id, work_type, laborers_needed, booking_date, duration_days, status)
    VALUES (?, ?, ?, ?, ?, 'pending')
  `;
  db.query(query, [1, formattedWork, laborers_needed, required_date, duration_days], (err, result) => {
    if (err) return res.status(500).json({ success: false, message: err.message });
    res.json({ success: true, bookingId: result.insertId });
  });
});

module.exports = router;