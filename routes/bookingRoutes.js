const express = require('express');
const router = express.Router();
const db = require('../db');

// 1. Get all bookings
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM bookings ORDER BY created_at DESC');
    res.json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 2. Create a new booking (Labor bulk booking or Machinery rental)
router.post('/create', async (req, res) => {
  try {
    const { farmer_id, booking_type, service_id, start_date, end_date, total_amount } = req.body;

    const query = `
      INSERT INTO bookings (farmer_id, booking_type, service_id, start_date, end_date, total_amount, status)
      VALUES (?, ?, ?, ?, ?, ?, 'pending')
    `;

    const [result] = await db.query(query, [
      farmer_id || null,
      booking_type,
      service_id || null,
      start_date,
      end_date,
      total_amount
    ]);

    res.json({
      success: true,
      message: 'Booking request submitted successfully!',
      booking_id: result.insertId
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;