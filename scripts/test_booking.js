// Test script to test the /api/web_bookings endpoint with various payloads

const API_URL = process.env.VITE_API_URL || 'https://detail-master-production.up.railway.app';

async function testBooking(payloadName, payload) {
  console.log(`\n========================================`);
  console.log(`Testing Payload: ${payloadName}`);
  console.log(`Payload Data:`, JSON.stringify(payload, null, 2));

  try {
    const res = await fetch(`${API_URL}/api/web_bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const status = res.status;
    const text = await res.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }

    console.log(`Response Status: ${status}`);
    console.log(`Response Body:`, data);
    return { status, data };
  } catch (error) {
    console.error(`Fetch Error:`, error.message);
    return { error: error.message };
  }
}

async function runTests() {
  console.log(`Testing against Backend: ${API_URL}`);

  // Test 1: Multiple integer service_ids
  await testBooking('Array of Integer service_ids', {
    full_name: 'Test Customer',
    phone: '9876543210',
    email: 'test@example.com',
    vehicle_brand: 'BMW',
    vehicle_model: 'M4',
    vehicle_type: 'sedan',
    service_id: [1, 2],
    preferred_date: '2026-09-01',
    preferred_time_period: 'Morning (9 AM - 12 PM)',
    additional_notes: 'Automated test booking'
  });

  // Test 2: Single integer service_id
  await testBooking('Single Integer service_id', {
    full_name: 'Test Customer',
    phone: '9876543210',
    email: 'test@example.com',
    vehicle_brand: 'BMW',
    vehicle_model: 'M4',
    vehicle_type: 'sedan',
    service_id: 1,
    preferred_date: '2026-09-01',
    preferred_time_period: 'Morning (9 AM - 12 PM)',
    additional_notes: 'Automated test booking'
  });

  // Test 3: Multiple string IDs (legacy)
  await testBooking('String Array service_id', {
    full_name: 'Test Customer',
    phone: '9876543210',
    email: 'test@example.com',
    vehicle_brand: 'BMW',
    vehicle_model: 'M4',
    vehicle_type: 'sedan',
    service_id: ['wash'],
    preferred_date: '2026-09-01',
    preferred_time_period: 'Morning (9 AM - 12 PM)',
    additional_notes: 'Automated test booking'
  });
}

runTests();
