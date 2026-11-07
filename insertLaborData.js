const db = require('./db');

async function insertLaborers() {
  try {
    const sampleLaborers = [
      ['Paddy Harvesting, Threshing', 700.00, 'available'],
      ['Paddy Transplanting, Weeding', 450.00, 'available'],
      ['Sugarcane Cutting, Loading', 750.00, 'available'],
      ['Banana Field Maintenance, Weeding', 450.00, 'available'],
      ['Turmeric Harvesting, Sorting', 500.00, 'available'],
      ['Plowing Support, Irrigation Channel Work', 650.00, 'available'],
      ['Cotton Picking, Manual Cleaning', 450.00, 'available'],
      ['Coconut Tree Climbing, Harvesting', 850.00, 'available']
    ];

    for (let item of sampleLaborers) {
      await db.query(
        'INSERT INTO laborers (skills, daily_wage, availability_status) VALUES (?, ?, ?)',
        item
      );
    }

    console.log('Sample labor groups inserted successfully!');
    process.exit();
  } catch (error) {
    console.error('Error inserting labor data: ', error.message);
    process.exit(1);
  }
}

insertLaborers();