import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FaShield as ShieldCheck, FaBolt as Zap, FaGlobe as Globe, FaAward as Award, FaIndustry as Factory, FaUsers as Users, FaArrowRight as ArrowRight } from 'react-icons/fa6';
import BannerCarousel from '../components/BannerCarousel';
import LogoCarousel from '../components/LogoCarousel';
import PageWrapper from '../components/PageWrapper';

const Home = () => {
  const partnerLogos = [
    '/img/lg1.png', '/img/lg2.png', '/img/lg3.png', '/img/lg4.png',
    '/img/lg5.png', '/img/lg6.png', '/img/lg7.png', '/img/lg8.png',
    '/img/lg9.png', '/img/lg10.png', '/img/lg11.png'
  ];

  const customerLogos = [
    '/img/logo1.png', '/img/logo2.png', '/img/logo3.png', '/img/logo4.png',
    '/img/logo5.png', '/img/logo6.png', '/img/logo7.png', '/img/logo8.png',
    '/img/logo9.png', '/img/logo10.png', '/img/01.png', '/img/04.png', '/img/log1.png'
  ];

  const features = [
    {
      icon: <ShieldCheck size={32} />,
      title: 'Quality Assured',
      desc: 'Certified manufacturing processes ensuring zero-defect products.'
    },
    {
      icon: <Zap size={32} />,
      title: 'Fast Delivery',
      desc: 'Optimized logistics for quick turnaround on custom assemblies.'
    },
    {
      icon: <Globe size={32} />,
      title: 'Global Reach',
      desc: 'Exporting premium hydraulic solutions to markets worldwide.'
    },
    {
      icon: <Award size={32} />,
      title: 'Expertise',
      desc: 'Over 30 years of excellence in high-pressure hose manufacturing.'
    }
  ];

  const stats = [
    { value: '30+', label: 'Years Experience', icon: <Award /> },
    { value: '10k+', label: 'Sq Ft Facility', icon: <Factory /> },
    { value: '500+', label: 'Global Clients', icon: <Users /> },
    { value: '2400', label: 'Max Bar Pressure', icon: <Zap /> },
  ];

  return (
    <PageWrapper>
      <div className="home-page">
        <Helmet>
          <title>Powerflex Industries | Leading Hydraulic Hose Manufacturer</title>
          <meta name="description" content="Powerflex Industries is a leading manufacturer and wholesale exporter of Hydraulic Hoses, Hose Assemblies and Hydraulic Pipe Fittings." />
        </Helmet>

        <BannerCarousel />

        {/* Stats Section */}
        <section className="stats-section">
          <div className="container">
            <div className="stats-grid">
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="stat-card"
                >
                  <div className="stat-icon">{stat.icon}</div>
                  <div className="stat-info">
                    <h3>{stat.value}</h3>
                    <p>{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Intro Section */}
        <section className="section-padding intro-section">
          <div className="container">
            <div className="intro-grid">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="intro-image-wrapper"
              >
                <img src="/img/Website Banner-01.jpg" alt="Manufacturing" className="intro-img" />
                <div className="experience-badge">
                  <span>30</span>
                  Years of Excellence
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="intro-text"
              >
                <span className="section-tag">WHO WE ARE</span>
                <h2 className="section-title">Leading the Way in <span className="gradient-text">Hydraulic Innovation</span></h2>
                <p className="section-desc">
                  Powerflex Industries was incorporated in 1993 with a mission to emerge as a leading hose assembly manufacturer by acquiring global capabilities. We provide world-class products by maintaining the highest standards of quality and professionalism.
                </p>
                <div className="feature-list">
                  {features.map((f, i) => (
                    <div key={i} className="feature-item">
                      <div className="feature-icon">{f.icon}</div>
                      <div>
                        <h4>{f.title}</h4>
                        <p>{f.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="btn-premium">
                  Learn Our Story <ArrowRight size={20} />
                </button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Partners & Clients Section */}
        <section className="partners-clients-section">
          <div className="container">
            <div className="text-center section-header-centered">
              <span className="section-tag">OUR NETWORK</span>
              <h2 className="section-title">Trusted by <span className="gradient-text">Industry Leaders</span></h2>
              <p className="section-desc mx-auto">
                We are proud to partner with global organizations and provide industry-leading hydraulic solutions to businesses worldwide.
              </p>
            </div>
          </div>
          
          <div className="carousels-container">
            <LogoCarousel title="Global Partners" logos={partnerLogos} speed={3500} direction="normal" />
            <LogoCarousel title="Trusted Customers" logos={customerLogos} speed={4000} direction="reverse" />
          </div>
        </section>
        {/* CTA Section */}
        <section className="cta-section gradient-bg">
          <div className="container">
            <div className="cta-content">
              <h2>Need a Custom Engineering Solution?</h2>
              <p>Our experts are ready to help you with your most complex hydraulic challenges.</p>
              <div className="cta-btns">
                <button className="btn-premium" style={{ background: 'var(--white)', color: 'var(--primary)' }}>
                  Request an Inquiry
                </button>
                <button className="btn-outline">
                  Download Catalog
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageWrapper>
  );
};

export default Home;
