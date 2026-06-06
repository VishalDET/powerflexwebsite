import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEnvelope, FaPhoneVolume, FaLocationDot, FaPaperPlane, FaClock } from 'react-icons/fa6';
import axios from 'axios';
import PageWrapper from '../components/PageWrapper';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    emailId: '',
    contactNo: '',
    companyName: '',
    designation: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/contact', formData);
      setStatus({ type: 'success', message: 'Message sent successfully! We will get back to you soon.' });
      setFormData({ name: '', emailId: '', contactNo: '', companyName: '', designation: '' });
    } catch (err) {
      setStatus({ type: 'error', message: 'Failed to send message. Please try again.' });
    }
    setLoading(false);
    setTimeout(() => setStatus({ type: '', message: '' }), 5000);
  };

  return (
    <PageWrapper>
      <div className="contact-page-premium">
        <Helmet>
          <title>Contact Us | Powerflex Industries</title>
        </Helmet>

        {/* Hero Section */}
        <section className="contact-hero gradient-bg">
          <div className="container">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="contact-hero-content text-center"
            >
              <h1 className="text-white">Get in <span className="gradient-text">Touch</span></h1>
              <p className="text-white opacity-75">Have a question or need a quote? Our team is here to help.</p>
            </motion.div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container">
            <div className="contact-main-grid">
              {/* Contact Information */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="contact-info-panel"
              >
                <div className="info-header">
                  <span className="section-tag">CONTACT DETAILS</span>
                  <h2>How Can We Help You?</h2>
                  <p>Reach out to us through any of these channels or visit our headquarters in Mumbai.</p>
                </div>

                <div className="info-cards-stack">
                  <div className="info-item-card glass-effect">
                    <div className="info-icon-box"><FaEnvelope /></div>
                    <div className="info-text">
                      <strong>Email Support</strong>
                      <p>info@powerflexind.com</p>
                    </div>
                  </div>

                  <div className="info-item-card glass-effect">
                    <div className="info-icon-box"><FaPhoneVolume /></div>
                    <div className="info-text">
                      <strong>Call Us</strong>
                      <p>+91 22 6704 7721 / 22</p>
                    </div>
                  </div>

                  <div className="info-item-card glass-effect">
                    <div className="info-icon-box"><FaLocationDot /></div>
                    <div className="info-text">
                      <strong>Headquarters</strong>
                      <p>Powerflex House, Sonawala Road, Goregaon East, Mumbai 400063</p>
                    </div>
                  </div>

                  <div className="info-item-card glass-effect">
                    <div className="info-icon-box"><FaClock /></div>
                    <div className="info-text">
                      <strong>Working Hours</strong>
                      <p>Mon - Sat: 9:00 AM - 6:30 PM</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="contact-form-panel card-hover"
              >
                <h3>Send a Message</h3>
                <form onSubmit={handleSubmit} className="premium-form">
                  <div className="form-row">
                    <div className="input-group">
                      <label>Full Name</label>
                      <input 
                        type="text" 
                        name="name" 
                        placeholder="John Doe"
                        value={formData.name} 
                        onChange={handleChange} 
                        required 
                      />
                    </div>
                    <div className="input-group">
                      <label>Email Address</label>
                      <input 
                        type="email" 
                        name="emailId" 
                        placeholder="john@company.com"
                        value={formData.emailId} 
                        onChange={handleChange} 
                        required 
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="input-group">
                      <label>Contact Number</label>
                      <input 
                        type="text" 
                        name="contactNo" 
                        placeholder="+91 00000 00000"
                        value={formData.contactNo} 
                        onChange={handleChange} 
                        required 
                      />
                    </div>
                    <div className="input-group">
                      <label>Company Name</label>
                      <input 
                        type="text" 
                        name="companyName" 
                        placeholder="Powerflex Industries"
                        value={formData.companyName} 
                        onChange={handleChange} 
                        required 
                      />
                    </div>
                  </div>

                  <div className="input-group">
                    <label>Designation</label>
                    <input 
                      type="text" 
                      name="designation" 
                      placeholder="e.g. Procurement Manager"
                      value={formData.designation} 
                      onChange={handleChange} 
                      required 
                    />
                  </div>

                  <button type="submit" className="btn-premium w-full" disabled={loading}>
                    {loading ? 'Processing...' : (
                      <>
                        Submit Inquiry <FaPaperPlane />
                      </>
                    )}
                  </button>

                  <AnimatePresence>
                    {status.message && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className={`form-status-alert ${status.type}`}
                      >
                        {status.message}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="map-section">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.6475657805216!2d72.85303641490257!3d19.166861987036643!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b7cc22e0303b%3A0xc3484f9440618057!2sSonawala%20Road%2C%20Goregaon%20East%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1651059523243!5m2!1sen!2sin" 
            width="100%" 
            height="500" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </section>
      </div>
    </PageWrapper>
  );
};

export default ContactUs;
