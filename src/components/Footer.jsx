import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Mail, 
  Phone, 
  MapPin, 
  ChevronRight, 
  Send,
  Linkedin
} from 'lucide-react';
import axios from 'axios';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    try {
      const res = await axios.post('http://localhost:5000/api/newsletter/subscribe', { emailId: email });
      setStatus({ type: 'success', message: res.data.message });
      setEmail('');
    } catch (err) {
      setStatus({ type: 'error', message: 'Subscription failed.' });
    }
    setTimeout(() => setStatus({ type: '', message: '' }), 5000);
  };

  return (
    <footer className="footer-premium">
      <div className="footer-wave">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
        </svg>
      </div>

      <div className="container">
        <div className="footer-grid-premium">
          {/* Brand Column */}
          <div className="footer-brand">
            <img src="/img/l1.png" alt="Powerflex" className="footer-logo" />
            <p>
              Leading the global market in high-pressure hydraulic solutions since 1993. Engineering excellence in every assembly.
            </p>
            <div className="footer-social-premium">
              <a href="#" className="social-icon-btn"><Facebook size={18} /></a>
              <a href="#" className="social-icon-btn"><Twitter size={18} /></a>
              <a href="#" className="social-icon-btn"><Instagram size={18} /></a>
              <a href="#" className="social-icon-btn"><Linkedin size={18} /></a>
            </div>
          </div>

          {/* Links Column */}
          <div className="footer-links-col">
            <h4>Quick Explore</h4>
            <ul>
              <li><Link to="/about"><ChevronRight size={14} /> Our Story</Link></li>
              <li><Link to="/products"><ChevronRight size={14} /> Product Catalog</Link></li>
              <li><Link to="/infrastructure"><ChevronRight size={14} /> Facilities</Link></li>
              <li><Link to="/awards"><ChevronRight size={14} /> Recognitions</Link></li>
              <li><Link to="/contact"><ChevronRight size={14} /> Global Support</Link></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="footer-newsletter-col">
            <h4>Join Our Newsletter</h4>
            <p>Get the latest industrial insights and product updates.</p>
            <form className="footer-form-premium" onSubmit={handleSubscribe}>
              <div className="input-group-premium">
                <Mail size={18} className="input-icon" />
                <input 
                  type="email" 
                  placeholder="Your Work Email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="send-btn">
                  <Send size={18} />
                </button>
              </div>
            </form>
            {status.message && <p className={`footer-status ${status.type}`}>{status.message}</p>}
          </div>

          {/* Contact Column */}
          <div className="footer-contact-col">
            <h4>Reach Us</h4>
            <ul className="footer-contact-list">
              <li>
                <div className="contact-icon-box"><MapPin size={18} /></div>
                <span>Powerflex House, Sonawala Road, Goregaon East, Mumbai 400063</span>
              </li>
              <li>
                <div className="contact-icon-box"><Phone size={18} /></div>
                <span>+91 22 6704 7721</span>
              </li>
              <li>
                <div className="contact-icon-box"><Mail size={18} /></div>
                <span>info@powerflexind.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom-premium">
        <div className="container bottom-content">
          <p>© {new Date().getFullYear()} Powerflex Industries. All Rights Reserved.</p>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <span className="separator">|</span>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
