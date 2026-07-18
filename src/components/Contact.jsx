import { useState } from 'react';
import { FiMapPin, FiPhone, FiMail } from 'react-icons/fi';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    timeSlot: '',
    vehicle: '',
    notes: '',
  });

  const availableSlots = ['09:00 AM', '10:30 AM', '12:00 PM', '01:30 PM', '03:00 PM', '04:30 PM'];
  // Mock booked slots for design purposes
  const bookedSlots = ['10:30 AM', '03:00 PM'];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you! Your booking request has been submitted. We will contact you shortly.');
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      service: '',
      date: '',
      timeSlot: '',
      vehicle: '',
      notes: '',
    });
  };

  return (
    <section className="contact" id="contact">
      <div className="container">
        <div className="contact-grid">
          <div className="contact-info">
            <span className="section-label">Get In Touch</span>
            <h2 className="section-title contact-title">BOOK YOUR<br />APPOINTMENT</h2>

            <div className="contact-details">
              <div className="contact-detail">
                <FiMapPin className="detail-icon" />
                <div>
                  <h4>Location</h4>
                  <p>Opp. KTM Bike Showroom,<br />Chankai, Marthandam</p>
                </div>
              </div>
              <div className="contact-detail">
                <FiPhone className="detail-icon" />
                <div>
                  <h4>Phone</h4>
                  <p>9111977721</p>
                  <p>9894834700</p>
                </div>
              </div>

              <div className="contact-detail">
                <FiMail className="detail-icon" />
                <div>
                  <h4>Email</h4>
                  <p>hello@detailingmasters.com</p>
                </div>
              </div>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label>Service Requested</label>
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
              >
                <option value="">Select a service…</option>
                <option value="express">Express Wash</option>
                <option value="interior">Interior Detail</option>
                <option value="exterior">Exterior Detail</option>
                <option value="full">Full Detail Package</option>
                <option value="paint">Paint Correction</option>
                <option value="ceramic">Ceramic Coating</option>
                <option value="other">Other / Not Sure</option>
              </select>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Preferred Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {formData.date && (
              <div className="form-group">
                <label>Select Time Slot</label>
                <div className="timeslot-grid">
                  {availableSlots.map((slot) => {
                    const isBooked = bookedSlots.includes(slot);
                    const isSelected = formData.timeSlot === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        className={`timeslot-btn ${isBooked ? 'booked' : ''} ${isSelected ? 'selected' : ''}`}
                        disabled={isBooked}
                        onClick={() => setFormData({ ...formData, timeSlot: slot })}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="form-group">
              <label>Vehicle Make & Model</label>
              <input
                type="text"
                name="vehicle"
                value={formData.vehicle}
                onChange={handleChange}
                placeholder="e.g. BMW M4"
              />
            </div>
            <div className="form-group">
              <label>Additional Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={4}
                placeholder="Tell us about your vehicle's condition or any specific requests..."
              />
            </div>
            <button type="submit" className="btn-primary form-submit">
              Send Booking Request
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
