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

            <div className="contact-map" style={{ marginTop: '40px', borderRadius: 'var(--radius)', overflow: 'hidden', height: '300px' }}>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3948.032954774763!2d77.23808897423896!3d8.29951919173554!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0455004a6f7003%3A0x938740e61277488c!2sDetailing%20masters!5e0!3m2!1sen!2sin!4v1785078483595!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="strict-origin-when-cross-origin">
              </iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
