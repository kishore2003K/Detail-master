/**
 * Detailing Masters Analytics & Conversion Tracking Helper
 * Safely sends conversion and interaction events to Google Analytics 4 (gtag.js)
 */

export function initAnalytics() {
  const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  if (!gaId || gaId.trim() === '' || gaId === 'G-XXXXXXXXXX') {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== 'function') {
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };
  }

  window.gtag('js', new Date());
  window.gtag('config', gaId);

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
  document.head.appendChild(script);
}

export function trackEvent(eventName, params = {}) {
  try {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', eventName, {
        ...params,
        timestamp: new Date().toISOString(),
      });
    }
  } catch (error) {
    console.debug('[Analytics Error]', error);
  }
}

/**
 * Track WhatsApp Chat Initiation
 */
export function trackWhatsAppClick(source = 'floating_button') {
  trackEvent('whatsapp_click', {
    event_category: 'Engagement',
    event_label: `WhatsApp - ${source}`,
    source,
  });
}

/**
 * Track Direct Phone Call Clicks
 */
export function trackCallClick(source = 'floating_button') {
  trackEvent('call_click', {
    event_category: 'Lead',
    event_label: `Phone Call - ${source}`,
    source,
  });
}

/**
 * Track Online Service Booking Submissions
 */
export function trackBookingSubmit(bookingDetails = {}) {
  trackEvent('generate_lead', {
    event_category: 'Conversion',
    event_label: 'Web Booking Request',
    service: Array.isArray(bookingDetails.service)
      ? bookingDetails.service.join(', ')
      : bookingDetails.service || 'Not specified',
    vehicle_type: bookingDetails.vehicle_type || 'Car',
    vehicle_brand: bookingDetails.vehicle_brand || '',
  });
}

/**
 * Track Google Maps / Location Directions Clicks
 */
export function trackDirectionsClick() {
  trackEvent('get_directions', {
    event_category: 'Engagement',
    event_label: 'Studio Location / Map Click',
  });
}

/**
 * Track Primary Call-to-Action button clicks
 */
export function trackCTAClick(ctaName, section = '') {
  trackEvent('cta_click', {
    event_category: 'Navigation',
    event_label: ctaName,
    section,
  });
}
