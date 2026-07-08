import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaFacebookF as Facebook, 
  FaXTwitter as Twitter, 
  FaInstagram as Instagram, 
  FaLinkedinIn as Linkedin,
  FaChevronRight as ChevronRight,
  FaPaperPlane as Send
} from 'react-icons/fa6';
import { 
  MdEmail as Mail, 
  MdPhone as Phone, 
  MdLocationOn as MapPin 
} from 'react-icons/md';
import axios from 'axios';

const FooterPremium = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    try {
      await axios.post('http://localhost:5000/api/newsletter/subscribe', { emailId: email });
      setStatus({ type: 'success', message: 'Subscribed!' });
      setEmail('');
    } catch (err) {
      setStatus({ type: 'error', message: 'Failed.' });
    }
    setTimeout(() => setStatus({ type: '', message: '' }), 5000);
  };

  return (
    <footer className="footer-v2">
      <div className="footer-wave-v2">
        <svg className="waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
          <defs>
            <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
          </defs>
          <g className="parallax-waves">
            <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(15, 23, 42, 0.3)" />
            <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(15, 23, 42, 0.5)" />
            <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(15, 23, 42, 0.7)" />
            <use xlinkHref="#gentle-wave" x="48" y="7" fill="#0f172a" />
          </g>
        </svg>
      </div>

      <div className="container">
        <div className="footer-content-v2">
          <div className="footer-info-v2">
            <img src="/img/l1.png" alt="Logo" className="f-logo-v2" />
            <p>Premium hydraulic solutions since 1993. Engineering excellence in every assembly.</p>
            <div className="f-socials-v2">
              <a href="#"><Facebook size={20} /></a>
              <a href="#"><Twitter size={20} /></a>
              <a href="#"><Instagram size={20} /></a>
              <a href="#"><Linkedin size={20} /></a>
            </div>
          </div>

          <div className="footer-nav-v2">
            <h4>Explore</h4>
            <ul>
              <li><Link to="/about">Our Story</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/infrastructure">Infrastructure</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-newsletter-v2">
            <h4>Stay Updated</h4>
            <div className="f-form-v2">
              <input 
                type="email" 
                placeholder="Email Address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button onClick={handleSubscribe}><Send size={18} /></button>
            </div>
            {status.message && <p className={status.type}>{status.message}</p>}
          </div>

          <div className="footer-contact-v2">
            <h4>Contact</h4>
            <p><MapPin size={16} /> Mumbai, Maharashtra</p>
            <p><Phone size={16} /> +91 22 6704 7721</p>
            <p><Mail size={16} /> info@powerflexind.com</p>
          </div>
        </div>
        
        <div className="footer-copy-v2">
          <p>© {new Date().getFullYear()} Powerflex Industries. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default FooterPremium;
