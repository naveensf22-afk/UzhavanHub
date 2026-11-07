const db = require('./db');

async function checkBookingColumns() {
  try {
    const [rows] = await db.query('DESCRIBE bookings');
    console.log('--- Columns in bookings table ---');
    console.table(rows);
    process.exit();
  } catch (error) {
    console.error('Error: ', error.message);
    process.exit(1);
  }
}

checkBookingColumns();