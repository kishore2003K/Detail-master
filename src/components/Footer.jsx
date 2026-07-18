import { useState } from 'react';
import { FiPhone, FiMail, FiArrowUpRight } from 'react-icons/fi';
import logo from '../assets/logo.png';
import './Footer.css';

const Footer = ({ onOpenPrivacy, onOpenTerms }) => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <a href="#" className="logo footer-logo">
              <img src={logo} alt="Detailing Masters Logo" />
            </a>
            <p className="footer-desc">
              Premium auto detailing and car wash services. Your vehicle, our passion.
            </p>
          </div>

          <div className="footer-links-group">
            <h4>Services</h4>
            <ul>
              <li><a href="#services">Express Wash</a></li>
              <li><a href="#services">Interior Detail</a></li>
              <li><a href="#services">Exterior Detail</a></li>
              <li><a href="#services">Full Detail</a></li>
              <li><a href="#services">Ceramic Coating</a></li>
            </ul>
          </div>

          <div className="footer-links-group">
            <h4>Company</h4>
            <ul>
              <li><a href="#about">About Us</a></li>
              <li><a href="#gallery">Gallery</a></li>
              <li><a href="#reviews">Reviews</a></li>
              <li><a href="#contact">Book Now</a></li>
            </ul>
          </div>

          <div className="footer-links-group">
            <h4>Contact</h4>
            <ul>
              <li>
                <a href="tel:+919111977721" className="footer-contact-link">
                  <FiPhone size={14} /> 9111977721
                </a>
              </li>
              <li>
                <a href="tel:+919894834700" className="footer-contact-link">
                  <FiPhone size={14} /> 9894834700
                </a>
              </li>
              <li>
                <a href="mailto:hello@detailingmasters.com" className="footer-contact-link">
                  <FiMail size={14} /> hello@detailingmasters.com
                </a>
              </li>
              <li>Opp. KTM Bike Showroom,</li>
              <li>Chankai, Marthandam</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} DETAILING MASTERS. All rights reserved.</p>
          <div className="footer-legal">
            <button onClick={onOpenPrivacy}>Privacy Policy</button>
            <button onClick={onOpenTerms}>Terms of Service</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
