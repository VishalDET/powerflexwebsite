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
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#0f172a"></path>
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
