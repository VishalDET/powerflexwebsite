import React from 'react';
import { motion } from 'framer-motion';
import { FaQuoteLeft } from 'react-icons/fa6';

const AboutUs = () => {
  return (
    <section className="md-message-section section-padding">
      <div className="container">
        <div className="md-message-grid">
          
          {/* Image Side - Modern Composite Layout */}
          <div className="md-image-composite">
            <motion.div 
              className="md-img-main-wrapper"
              initial={{ opacity: 0, x: -50, y: -20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <img src="/img/sudhir.jpg" alt="Managing Director" className="md-img-main" onError={(e) => { e.currentTarget.src = '/img/person-1.jpg'; e.currentTarget.onerror = null; }} />
              <div className="md-img-overlay"></div>
            </motion.div>

            <motion.div 
              className="md-img-secondary-wrapper"
              initial={{ opacity: 0, x: 50, y: 50 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <img src="/img/machi.jpg" alt="Manufacturing Facility" className="md-img-secondary" onError={(e) => { e.currentTarget.src = '/img/portfolio-1.jpg'; e.currentTarget.onerror = null; }} />
            </motion.div>

            <motion.div 
              className="md-experience-card"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="glass-card">
                <span className="years">30+</span>
                <span className="text">Years of<br/>Leadership</span>
              </div>
            </motion.div>

            {/* Decorative elements */}
            <div className="md-deco-dots"></div>
            <div className="md-deco-blob"></div>
          </div>

          {/* Content Side */}
          <motion.div 
            className="md-content-wrapper"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="md-quote-icon-wrapper">
              <FaQuoteLeft className="md-quote-icon" />
            </div>
            
            <span className="section-tag">MESSAGE FROM DESK</span>
            <h2 className="section-title">Driving <span className="gradient-text">Excellence</span> in Every Hose Assembly</h2>
            
            <div className="md-message-body">
              <p>
                At Powerflex Industries, our commitment goes beyond manufacturing hydraulic solutions. We engineer trust. For over three decades, we have been dedicated to providing our global partners with products that withstand the most extreme pressures and rigorous environments.
              </p>
              <p>
                Innovation, precision, and uncompromised quality are the cornerstones of our operations. We continue to invest in advanced technology and our talented workforce to ensure that every fitting and assembly that leaves our facility sets the industry standard.
              </p>
            </div>

            <div className="md-signature-area">
              <div className="md-details">
                <h4 className="md-name">Managing Director</h4>
                <span className="md-title">Powerflex Industries</span>
              </div>
              {/* Optional: Add a stylized cursive signature image here if available */}
              <div className="md-signature-stylized">
                Powerflex
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutUs;
