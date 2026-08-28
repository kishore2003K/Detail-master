// Test script to check which payload structure populates web_booking_services

const API_URL = process.env.VITE_API_URL || 'https://detail-master-production.up.railway.app';

async function testPayload(name, payload) {
  console.log(`\n========================================`);
  console.log(`Testing: ${name}`);
  console.log(`Payload:`, JSON.stringify(payload, null, 2));

  try {
    const res = await fetch(`${API_URL}/api/web_bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const status = res.status;
    const data = await res.json().catch(() => ({}));
    console.log(`HTTP Status: ${status}`);
    console.log(`Response Data:`, data);
    return { status, data };
  } catch (err) {
    console.error(`Error:`, err.message);
    return { error: err.message };
  }
}

async function run() {
  // Case A: service_id: 1, service_ids: [1, 2]
  await testPayload('service_id as integer + service_ids as array', {
    full_name: 'Multi Service Test A',
    phone: '9999911111',
    email: 'multi_a@example.com',
    vehicle_brand: 'Audi',
    vehicle_model: 'A6',
    vehicle_type: 'sedan',
    service_id: 1,
    service_ids: [1, 2],
    preferred_date: '2026-09-02',
    preferred_time_period: 'Morning (9 AM - 12 PM)',
    additional_notes: 'Test for web_booking_services junction table'
  });

  // Case B: service_id: 1, services: [1, 2]
  await testPayload('service_id as integer + services as array', {
    full_name: 'Multi Service Test B',
    phone: '9999922222',
    email: 'multi_b@example.com',
    vehicle_brand: 'Mercedes',
    vehicle_model: 'C200',
    vehicle_type: 'sedan',
    service_id: 1,
    services: [1, 2],
    preferred_date: '2026-09-02',
    preferred_time_period: 'Morning (9 AM - 12 PM)',
    additional_notes: 'Test for web_booking_services junction table'
  });

  // Case C: services: [{ service_id: 1 }, { service_id: 2 }]
  await testPayload('service_id as integer + services as object array', {
    full_name: 'Multi Service Test C',
    phone: '9999933333',
    email: 'multi_c@example.com',
    vehicle_brand: 'Porsche',
    vehicle_model: '911',
    vehicle_type: 'luxury',
    service_id: 1,
    services: [{ service_id: 1 }, { service_id: 2 }],
    preferred_date: '2026-09-02',
    preferred_time_period: 'Evening (4 PM - 8 PM)',
    additional_notes: 'Test for web_booking_services junction table'
  });
}

run();
