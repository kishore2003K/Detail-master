/**
 * WhatsApp Confirmation & Booking Utility for Detailing Masters
 */

/**
 * Generates the One-Click WhatsApp Confirmation URL for admin/staff to send to customers
 * @param {Object} booking - Booking data from database
 * @param {string} booking.full_name - Customer name
 * @param {string} booking.phone - Customer phone number
 * @param {string|Array} [booking.services] - Selected service names
 * @param {string} [booking.service_name] - Single service name if applicable
 * @param {string} [booking.preferred_date] - Date of appointment
 * @param {string} [booking.allocated_time] - Confirmed slot time (e.g. "10:30 AM")
 * @param {string} [booking.preferred_time_period] - Preferred time period fallback
 * @returns {string} Encoded WhatsApp URL
 */
export function getWhatsAppConfirmationUrl(booking) {
  if (!booking) return '';

  let cleanPhone = String(booking.phone || '').replace(/\D/g, '');
  if (cleanPhone.length === 10) {
    cleanPhone = '91' + cleanPhone;
  }

  const customerName = booking.full_name || 'Valued Customer';
  const servicesText = Array.isArray(booking.services)
    ? booking.services.join(' & ')
    : (booking.service_name || booking.services || 'Car/Bike Detailing');

  const dateFormatted = booking.preferred_date
    ? new Date(booking.preferred_date).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    : 'Scheduled Date';

  const timeSlot = booking.allocated_time || booking.preferred_time_period || '10:30 AM';

  const message = 
`Hi ${customerName}, your booking for *${servicesText}* is *CONFIRMED* for *${dateFormatted} at ${timeSlot}* at *Detailing Masters Marthandam*.

📍 *Location:* Opposite KTM Bike Showroom, Chankai, Marthandam.
🗺️ *Google Maps:* https://maps.google.com/?cid=10630559981881673868
📞 *Contact:* +91 91119 77721

_Please reach out to us if you need to reschedule._`;

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

/**
 * Generates the Customer-to-Studio Booking URL
 * @param {Object} data - Customer booking form payload
 * @param {string} serviceNames - Comma/ampersand separated service names
 * @param {string} refId - Booking reference number (e.g. "DM-84921")
 * @returns {string} Encoded WhatsApp URL for studio phone
 */
export function getCustomerBookingWhatsAppUrl(data, serviceNames, refId) {
  const text = `*New Booking Request (Ref: #${refId})*\n\n` +
    `👤 *Customer:* ${data.name}\n` +
    `📞 *Phone:* ${data.phone}\n` +
    `📧 *Email:* ${data.email || 'N/A'}\n` +
    `🚗 *Vehicle:* ${data.brand || ''} ${data.model || ''} (${data.type || 'Car'})\n` +
    `✨ *Services:* ${serviceNames || 'Detailing'}\n` +
    `📅 *Date:* ${data.date || 'Flexible'}\n` +
    `⏰ *Time Slot:* ${data.time_period || 'Anytime'}\n` +
    `📝 *Notes:* ${data.message || 'None'}\n\n` +
    `_Please confirm availability and slot timings._`;

  return `https://wa.me/919111977721?text=${encodeURIComponent(text)}`;
}
