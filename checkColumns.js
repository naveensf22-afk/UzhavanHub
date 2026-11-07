const db = require('./db');

async function showColumns() {
  try {
    const [rows] = await db.query('DESCRIBE machinery');
    console.log('--- Columns in machinery table ---');
    console.table(rows);
    process.exit();
  } catch (error) {
    console.error('Error: ', error.message);
    process.exit(1);
  }
}

showColumns();