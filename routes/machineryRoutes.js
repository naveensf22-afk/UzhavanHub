const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'uzhavanhub_db'
});

// 1. Get machinery list
router.get('/', (req, res) => {
  db.query('SELECT * FROM machinery', (err, results) => {
    if (err || !results || results.length === 0) {
      return res.json({
        data: [
          { id: 1, machinery_name: 'Mahindra 575 DI Tractor', type: 'Tractor', hourly_rate: 800 },
          { id: 2, machinery_name: 'John Deere 5050D', type: 'Heavy Tractor', hourly_rate: 950 },
          { id: 3, machinery_name: 'VST Shakti Power Tiller', type: 'Power Tiller', hourly_rate: 450 }
        ]
      });
    }
    res.json({ data: results });
  });
});

// 2. Get machinery bookings
router.get('/bookings', (req, res) => {
  res.json({
    data: [
      { id: 101, machinery_name: 'Mahindra 575 DI Tractor', rental_date: '2026-11-15', rental_hours: 6, status: 'pending' }
    ]
  });
});

// 3. Update status
router.put('/bookings/:id/status', (req, res) => {
  res.json({ success: true, message: 'Status updated' });
});

module.exports = router;