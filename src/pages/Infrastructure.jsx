import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FaBuilding, FaGear, FaShield, FaTruckFast } from 'react-icons/fa6';
import PageWrapper from '../components/PageWrapper';

const Infrastructure = () => {
  const infraImages = [
    { src: '/img/1.png', title: 'Assembly Unit' },
    { src: '/img/2.png', title: 'Testing Lab' },
    { src: '/img/4.png', title: 'Storage' },
    { src: '/img/5.png', title: 'Quality Control' }
  ];

  const machineImages = [
    { src: '/img/machi.jpg', title: 'Crimping Machine' },
    { src: '/img/machi1.jpg', title: 'Precision Lathe' },
    { src: '/img/8229-6431097.jpg', title: 'Pressure Tester' },
    { src: '/img/3.png', title: 'CNC Workshop' }
  ];

  const specs = [
    { icon: <FaBuilding />, title: '10,000 Sq Ft', desc: 'Centralized production and testing facility in Mumbai.' },
    { icon: <FaGear />, title: 'Parker Certified', desc: 'Authorized assembler for Parker Polyflex, Germany.' },
    { icon: <FaShield />, title: 'QA/QC Lab', desc: 'Thorough testing for hoses up to 2400 bar pressure.' },
    { icon: <FaTruckFast />, title: 'Global Logistics', desc: 'Sea and road-worthy packaging for worldwide shipping.' }
  ];

  return (
    <PageWrapper>
      <div className="infrastructure-page-premium">
        <Helmet>
          <title>Infrastructure | Powerflex Industries</title>
        </Helmet>

        {/* Hero Section */}
        <section className="infra-hero gradient-bg">
          <div className="container">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="infra-hero-content"
            >
              <h1 className="text-white">World-Class <span className="gradient-text">Facilities</span></h1>
              <p className="text-white opacity-75">Advanced manufacturing and testing infrastructure in the heart of Mumbai.</p>
            </motion.div>
          </div>
        </section>

        {/* Specs Grid */}
        <section className="specs-section">
          <div className="container">
            <div className="specs-grid">
              {specs.map((spec, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="spec-card glass-effect"
                >
                  <div className="spec-icon">{spec.icon}</div>
                  <h3>{spec.title}</h3>
                  <p>{spec.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Plant Description */}
        <section className="section-padding plant-details">
          <div className="container">
            <div className="details-grid">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="details-text"
              >
                <span className="section-tag">OUR HUB</span>
                <h2 className="premium-title">The Powerflex Manufacturing Hub</h2>
                <p>
                  Powerflex Industries is in a continuous process of evolution. Our plant, 
                  geographically located in the heart of Mumbai, boasts a 10,000 sq ft area 
                  dedicated to production, testing, and packaging.
                </p>
                <p>
                  We maintain a large stock of hoses, fittings, and accessories off-the-shelf 
                  to ensure immediate delivery. Our workshop features specialized crimping and 
                  testing facilities approved by <strong>PARKER POLYFLEX, GERMANY</strong>.
                </p>
                <div className="approval-badge">
                  <img src="/img/lg1.png" alt="Parker Approved" />
                  <div>
                    <strong>PARKER CERTIFIED</strong>
                    <p>Official Assembly Partner in India</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="details-image"
              >
                <img src="/img/ban3.jpg" alt="Manufacturing Plant" />
                <div className="experience-badge-floating">
                  <div className="badge-value">10k+</div>
                  <div className="badge-text">Sq. Ft. Facility</div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Gallery Sections */}
        <section className="section-padding bg-soft">
          <div className="container">
            <div className="section-header text-center">
              <h2 className="premium-title">Plant Facilities</h2>
            </div>
            <div className="infra-gallery">
              {infraImages.map((img, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ scale: 1.03 }}
                  className="gallery-item card-hover"
                >
                  <img src={img.src} alt={img.title} />
                  <div className="gallery-overlay">
                    <span>{img.title}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="section-header text-center" style={{ marginTop: '5rem' }}>
              <h2 className="premium-title">Advanced Machinery</h2>
            </div>
            <div className="infra-gallery">
              {machineImages.map((img, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ scale: 1.03 }}
                  className="gallery-item card-hover"
                >
                  <img src={img.src} alt={img.title} />
                  <div className="gallery-overlay">
                    <span>{img.title}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Logistics Section */}
        <section className="section-padding logistics-section">
          <div className="container">
            <div className="logistics-card gradient-bg">
              <div className="logistics-content">
                <FaTruckFast className="logistics-icon" />
                <h2>Global Shipping & Logistics</h2>
                <p>
                  Our logistics team is well-versed with international legalities and 
                  tied up with reputed transport operators. Every product is packed for 
                  sea-worthy and road-worthy transportation to ensure it reaches you safely.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageWrapper>
  );
};

export default Infrastructure;
