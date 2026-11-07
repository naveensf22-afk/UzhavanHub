const db = require('./db');

async function insertMachinery() {
  try {
    const sampleMachinery = [
      ['Mahindra 575 DI', 'Tractor', 600, 'available'],
      ['John Deere 5310', 'Tractor', 750, 'available'],
      ['Power Tiller 15HP', 'Power Tiller', 350, 'available'],
      ['Paddy Straw Baler', 'Straw Baler', 800, 'available'],
      ['Manual / Cono Weeder', 'Weeder', 100, 'available'],
      ['Rotavator 7 Feet', 'Implement', 250, 'available']
    ];

    for (let item of sampleMachinery) {
      await db.query(
        'INSERT INTO machinery (machine_name, machine_type, hourly_rate, availability_status) VALUES (?, ?, ?, ?)',
        item
      );
    }

    console.log('All machinery including Weeder, Tiller, and Baler inserted successfully!');
    process.exit();
  } catch (error) {
    console.error('Error inserting data: ', error.message);
    process.exit(1);
  }
}

insertMachinery();