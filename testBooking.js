const db = require('./db');

async function createSampleBooking() {
  try {
    // Sample booking: Farmer booking 10 laborers for Paddy Harvesting
    const sampleBooking = {
      farmer_id: null,
      booking_type: 'labor',
      service_id: 1, // Paddy Harvesting labor group
      start_date: '2026-11-10',
      end_date: '2026-11-10',
      total_amount: 7000.00, // 10 laborers * 700
      status: 'pending'
    };

    const query = `
      INSERT INTO bookings (farmer_id, booking_type, service_id, start_date, end_date, total_amount, status)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await db.query(query, [
      sampleBooking.farmer_id,
      sampleBooking.booking_type,
      sampleBooking.service_id,
      sampleBooking.start_date,
      sampleBooking.end_date,
      sampleBooking.total_amount,
      sampleBooking.status
    ]);

    console.log('Sample booking created successfully with ID:', result.insertId);
    process.exit();
  } catch (error) {
    console.error('Error inserting test booking: ', error.message);
    process.exit(1);
  }
}

createSampleBooking();