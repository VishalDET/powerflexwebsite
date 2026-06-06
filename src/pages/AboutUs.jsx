import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FiTarget as Target, FiEye as Eye, FiShield as Shield, FiUsers as Users, FiAward as Award, FiBriefcase as Briefcase } from 'react-icons/fi';
import PageWrapper from '../components/PageWrapper';

const AboutUs = () => {
  const values = [
    { icon: <Target />, title: 'Mission', desc: 'To emerge as a leading hose assembly manufacturer by acquiring global capabilities and providing world-class products.' },
    { icon: <Eye />, title: 'Vision', desc: 'Maintaining the highest standards of quality and professionalism to be the first choice for global industrial solutions.' },
    { icon: <Shield />, title: 'Quality', desc: 'Widely acclaimed for manufacturing and supplying a flawless range of durable and highly tensile products.' }
  ];

  const milestones = [
    { year: '1993', event: 'Incorporation of Powerflex Industries' },
    { year: '2005', event: 'Expansion into International Markets' },
    { year: '2015', event: 'Approved as PARKER Certified Assembler' },
    { year: '2023', event: '30 Years of Engineering Excellence' }
  ];

  return (
    <PageWrapper>
      <div className="about-page-premium">
        <Helmet>
          <title>About Us | Powerflex Industries</title>
        </Helmet>

        {/* Hero Section */}
        <section className="about-hero gradient-bg">
          <div className="container hero-content">
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="section-tag"
            >
              ESTABLISHED 1993
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-white"
            >
              Engineering the <span className="gradient-text">Future</span> of Hydraulics
            </motion.h1>
          </div>
        </section>

        {/* Story Section */}
        <section className="section-padding story-section">
          <div className="container">
            <div className="story-grid">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="story-text"
              >
                <h2 className="premium-title">Legacy of Innovation</h2>
                <p>
                  Powerflex Industries was incorporated in 1993 by the dynamic duo: 
                  <strong> Mr. Nayan Jagani</strong> and <strong>Late. Mr. Sudhir Nagda</strong>. 
                  What started as a focused manufacturing unit has evolved into a global powerhouse 
                  in the hose assembly industry.
                </p>
                <p>
                  Today, we are a widely acclaimed company engaged in manufacturing, trading, 
                  and exporting a wide gamut of hoses for all applications up to 2400 bar. 
                  Our products serve critical sectors including pharmaceutical, chemical, 
                  construction, mining, oil & gas, and aviation.
                </p>
                <div className="milestone-list">
                  {milestones.map((m, i) => (
                    <div key={i} className="milestone-item">
                      <span className="m-year">{m.year}</span>
                      <span className="m-event">{m.event}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="story-visual"
              >
                <div className="image-stack">
                  <img src="/img/Website Banner-01.jpg" alt="Infrastructure" className="img-large" />
                  <div className="stat-overlay glass-effect">
                    <h3>30+</h3>
                    <p>Years Experience</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="values-section section-padding bg-soft">
          <div className="container">
            <div className="section-header text-center">
              <h2 className="premium-title">Our Foundation</h2>
            </div>
            <div className="values-grid">
              {values.map((v, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -10 }}
                  className="value-card card-hover"
                >
                  <div className="value-icon">{v.icon}</div>
                  <h3>{v.title}</h3>
                  <p>{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Leadership Section */}
        <section className="leadership-section section-padding">
          <div className="container">
            <div className="section-header text-center">
              <h2 className="premium-title">Leadership Team</h2>
              <p>The visionaries behind our global success</p>
            </div>
            <div className="leaders-grid">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="leader-profile card-hover"
              >
                <div className="profile-img-box">
                  <img src="/img/ig.png" alt="Nayan Jagani" />
                </div>
                <div className="profile-info">
                  <h4>Mr. Nayan Jagani</h4>
                  <span className="designation">Director</span>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="leader-profile card-hover"
              >
                <div className="profile-img-box">
                  <img src="/img/s.png" alt="Sudhir Nagda" />
                </div>
                <div className="profile-info">
                  <h4>Late. Mr. Sudhir Nagda</h4>
                  <span className="designation">Founder</span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Partnership CTA */}
        <section className="about-cta section-padding gradient-bg">
          <div className="container text-center">
            <h2 className="text-white">Partner with Excellence</h2>
            <p className="text-white opacity-75">Connect with us for high-performance hydraulic solutions.</p>
            <div className="cta-actions">
              <button className="btn-premium" style={{ background: 'white', color: 'var(--primary)' }}>
                View Catalog
              </button>
              <button className="btn-outline">
                Contact Sales
              </button>
            </div>
          </div>
        </section>
      </div>
    </PageWrapper>
  );
};

export default AboutUs;
