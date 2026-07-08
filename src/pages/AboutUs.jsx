import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Target, Eye, ShieldCheck, Award, ArrowRight, Zap, Users, Trophy } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';
import DirectorMessage from '../components/AboutUs';

const AboutUs = () => {
  const values = [
    {
      icon: <Target size={32} />,
      title: 'Mission',
      desc: 'To emerge as a leading hose assembly manufacturer by acquiring global capabilities and providing world-class products.'
    },
    {
      icon: <Eye size={32} />,
      title: 'Vision',
      desc: 'Maintaining the highest standards of quality and professionalism to be the first choice for global industrial solutions.'
    },
    {
      icon: <ShieldCheck size={32} />,
      title: 'Quality',
      desc: 'Widely acclaimed for manufacturing and supplying a flawless range of durable and highly tensile products.'
    }
  ];

  const milestones = [
    { year: '1993', event: 'Incorporation of Powerflex Industries', desc: 'Established by Mr. Nayan Jagani and Late Mr. Sudhir Nagda.' },
    { year: '2005', event: 'Expansion into International Markets', desc: 'Began exports to Middle East, Europe, and Southeast Asia.' },
    { year: '2015', event: 'Approved as PARKER Certified Assembler', desc: 'Achieved elite certified partnership status with Parker Hannifin.' },
    { year: '2023', event: '30 Years of Engineering Excellence', desc: 'Celebrating three decades of reliability and industrial trust.' }
  ];

  return (
    <PageWrapper>
      <div className="about-page-premium">
        <Helmet>
          <title>About Us | Powerflex Industries</title>
          <meta name="description" content="Learn about our 30+ year legacy of innovation, engineering excellence, and our mission to provide leading hydraulic hose solutions globally." />
        </Helmet>

        {/* Hero Section */}
        <section className="about-hero-premium position-relative overflow-hidden">
          <div className="hero-mesh-overlay"></div>
          <div className="container position-relative z-index-1">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <span className="about-section-badge mb-3">ESTABLISHED 1993</span>
              <h1 className="text-white">
                Engineering the <span className="gradient-glow-text">Future</span> of Hydraulics
              </h1>
              <p className="text-white opacity-75 max-w-2xl mx-auto mt-3">
                Over three decades of premium manufacturing, innovative engineering, and unyielding trust in global markets.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Story Section with Timeline */}
        <section className="section-padding story-section bg-soft-gray">
          <div className="container">
            <div className="story-grid-premium">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="story-text-premium"
              >
                <span className="story-meta-badge">Our Legacy</span>
                <h2 className="story-title-premium">A Legacy built on Innovation & Trust</h2>
                <p>
                  Powerflex Industries was incorporated in 1993 by the visionaries
                  <strong> Mr. Nayan Jagani</strong> and <strong>Late. Mr. Sudhir Nagda</strong>.
                  What started as a focused local manufacturing unit has evolved into a global powerhouse in high-pressure hose assembly fabrication.
                </p>
                <p>
                  Today, we are widely acclaimed for manufacturing, trading, and exporting an extensive gamut of industrial hoses supporting working pressures up to 2400 bar. Our customized setups serve crucial sectors including Oil & Gas, Steel Plants, Aviation, Earthmoving, and Pharmaceuticals.
                </p>

                {/* Timeline Path */}
                <div className="interactive-timeline mt-5">
                  {milestones.map((m, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.15 }}
                      className="timeline-step"
                    >
                      <div className="timeline-node">
                        <div className="node-pulse"></div>
                      </div>
                      <div className="timeline-info">
                        <span className="timeline-year">{m.year}</span>
                        <h4>{m.event}</h4>
                        <p>{m.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Graphic/Image Stack */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="story-visual-premium"
              >
                <div className="glass-composite-wrapper">
                  <div className="composite-img-wrapper main-img">
                    <img src="/img/Website Banner-01.jpg" alt="Industrial Facility" />
                    <div className="composite-overlay"></div>
                  </div>
                  <motion.div
                    whileHover={{ y: -8 }}
                    className="floating-stats-card glass-effect"
                  >
                    <Trophy size={36} className="stats-icon text-accent" />
                    <div>
                      <h3>30+</h3>
                      <p>Years of Engineering Excellence</p>
                    </div>
                  </motion.div>
                  <div className="deco-gradient-circle"></div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <DirectorMessage />

        {/* Foundation & Values Section */}
        <section className="values-section-premium section-padding bg-white">
          <div className="container">
            <div className="text-center mb-5">
              <span className="about-section-badge">Core Pillars</span>
              <h2 className="premium-title text-center mt-2">The Foundation of Our Quality</h2>
            </div>
            <div className="values-grid-premium">
              {values.map((v, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="value-card-premium"
                >
                  <div className="value-icon-circle">
                    {v.icon}
                  </div>
                  <h3>{v.title}</h3>
                  <p>{v.desc}</p>
                  <div className="card-shine-effect"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Leadership Section */}
        <section className="leadership-section-premium section-padding bg-soft-gray">
          <div className="container">
            <div className="text-center mb-8">
              <span className="about-section-badge">Our Founders</span>
              <h2 className="premium-title text-center mt-2">Executive Leadership</h2>
              <p className="text-muted max-w-lg mx-auto">The visionaries behind our global success and engineering principles.</p>
            </div>
            <div className="leaders-grid-premium mt-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="leader-card-premium"
              >
                <div className="leader-image-box">
                  <img src="/img/ig.png" alt="Mr. Nayan Jagani" />
                  <div className="leader-overlay-tint"></div>
                </div>
                <div className="leader-details-premium">
                  <h4>Mr. Nayan Jagani</h4>
                  <span className="leader-designation">Director</span>
                  <p>Co-founded Powerflex in 1993, driving the company\'s strategic international expansions and quality benchmarks.</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 }}
                whileHover={{ y: -10 }}
                className="leader-card-premium"
              >
                <div className="leader-image-box">
                  <img src="/img/s.png" alt="Late. Mr. Sudhir Nagda" />
                  <div className="leader-overlay-tint"></div>
                </div>
                <div className="leader-details-premium">
                  <h4>Late. Mr. Sudhir Nagda</h4>
                  <span className="leader-designation">Founder</span>
                  <p>Laid down the foundation of technological mastery and operational ethics that guide our engineering systems today.</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Dynamic Partnership CTA */}
        <section className="about-cta-premium section-padding position-relative overflow-hidden">
          <div className="cta-pattern-bg"></div>
          <div className="container text-center position-relative z-index-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="cta-glass-panel"
            >
              <h2>Partner with Global Excellence</h2>
              <p className="max-w-xl mx-auto mt-2">
                Connect with our technical sales division to discover custom-engineered high-pressure assemblies matching international quality specs.
              </p>
              <div className="cta-actions-premium mt-4">
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  whileHover={{ scale: 1.03 }}
                  className="btn-premium btn-accent-fill"
                  onClick={() => window.location.href = '/products'}
                >
                  View Catalog <ArrowRight size={16} className="ms-2" />
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  whileHover={{ scale: 1.03 }}
                  className="btn-outline-glass"
                  onClick={() => window.location.href = '/contact'}
                >
                  Contact Sales
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </PageWrapper>
  );
};

export default AboutUs;
