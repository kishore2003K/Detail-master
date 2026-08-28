const API_URL = process.env.VITE_API_URL || 'https://detail-master-production.up.railway.app';

async function testVariations() {
  const variations = [
    {
      name: 'service_id: 1 with extra services in notes',
      payload: {
        full_name: 'Test Customer',
        phone: '9876543210',
        email: 'test@example.com',
        vehicle_brand: 'BMW',
        vehicle_model: 'M4',
        vehicle_type: 'sedan',
        service_id: 1,
        preferred_date: '2026-09-01',
        preferred_time_period: 'Morning (9 AM - 12 PM)',
        additional_notes: 'Selected Services: Foam Wash, Ceramic Coating\nAdditional Notes: Test notes'
      }
    },
    {
      name: 'service_id: 1, service_ids: [1, 2]',
      payload: {
        full_name: 'Test Customer',
        phone: '9876543210',
        email: 'test@example.com',
        vehicle_brand: 'BMW',
        vehicle_model: 'M4',
        vehicle_type: 'sedan',
        service_id: 1,
        service_ids: [1, 2],
        preferred_date: '2026-09-01',
        preferred_time_period: 'Morning (9 AM - 12 PM)',
        additional_notes: 'Test booking'
      }
    }
  ];

  for (const v of variations) {
    console.log(`\nTesting: ${v.name}`);
    const res = await fetch(`${API_URL}/api/web_bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(v.payload)
    });
    const status = res.status;
    const data = await res.json().catch(() => ({}));
    console.log(`Status: ${status}`, data);
  }
}

testVariations();
