const mysql = require('mysql2');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'uzhavanhub_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 5000
});

// பிழை ஏற்பட்டாலும் சர்வரை நிறுத்தாமல் லாக் மட்டும் செய்யும் அமைப்பு
pool.getConnection((err, connection) => {
  if (err) {
    console.warn('⚠️ Notice: Running without cloud database:', err.message);
  } else {
    console.log('✅ Connected to MySQL Database: uzhavanhub_db');
    connection.release();
  }
});

module.exports = pool.promise();