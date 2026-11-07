const db = require('./db');

async function checkLabourColumns() {
  try {
    const [rows] = await db.query('DESCRIBE laborers');
    console.log('--- Columns in laborers table ---');
    console.table(rows);
    process.exit();
  } catch (error) {
    console.error('Error: ', error.message);
    process.exit(1);
  }
}

checkLabourColumns();