import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Trophy, Star, ShieldCheck, FileText, ChevronRight, ArrowRight } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import PageWrapper from '../components/PageWrapper';

const localCertificates = [
  {
    CertificateId: 'local-bop',
    CertificateTitle: 'BOP Rubber Certificate (Exp: 2028-01-31)',
    CertificateFile: '/certificates/BOP certificate rubber Powerflex Industries India expire date_2028-01-31....pdf',
    CertificateNo: 'BOP-2028',
    IsPdf: true
  },
  {
    CertificateId: 'local-iso',
    CertificateTitle: 'ISO Certificate',
    CertificateFile: '/certificates/ISO CERTIFICATE.PDF',
    CertificateNo: 'ISO-9001',
    IsPdf: true
  },
  {
    CertificateId: 'local-powerflex',
    CertificateTitle: 'Powerflex Industries Certificate',
    CertificateFile: '/certificates/Powerflex Industries.pdf',
    CertificateNo: 'PI-CERT',
    IsPdf: true
  },
  {
    CertificateId: 'local-workshop',
    CertificateTitle: 'Powerflex Workshop O&G 3000bar Certificate (2026)',
    CertificateFile: '/certificates/Powerflex_workshop_O&G 3000bar_2026.pdf',
    CertificateNo: 'OG-3000BAR',
    IsPdf: true
  },
  {
    CertificateId: 'local-udyam',
    CertificateTitle: 'Udyam Registration Certificate',
    CertificateFile: '/certificates/Print _ Udyam Registration Certificate New.pdf',
    CertificateNo: 'UDYAM-REG',
    IsPdf: true
  }
];

const AwardsAndCertificates = () => {
  const location = useLocation();
  const isAwardsRoute = location.pathname.toLowerCase().includes('awards');
  
  const [activeTab, setActiveTab] = useState(isAwardsRoute ? 'award' : 'certificate');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sync active tab with route if it changes
  useEffect(() => {
    setActiveTab(location.pathname.toLowerCase().includes('awards') ? 'award' : 'certificate');
  }, [location.pathname]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [certsRes, awardsRes] = await Promise.all([
          axios.get('http://localhost:5000/api/certificates').catch(() => ({ data: [] })),
          axios.get('http://localhost:5000/api/awards').catch(() => ({ data: [] }))
        ]);
        
        const certsData = Array.isArray(certsRes.data) ? certsRes.data : (certsRes.data?.data || []);
        const awardsData = Array.isArray(awardsRes.data) ? awardsRes.data : (awardsRes.data?.data || []);
        
        const mappedCerts = [
          ...localCertificates,
          ...certsData
        ].map(c => ({
          id: `cert-${c.CertificateId || c.id || Math.random()}`,
          title: c.CertificateTitle,
          file: c.CertificateFile,
          no: c.CertificateNo,
          type: 'certificate',
          isPdf: c.IsPdf || c.CertificateFile?.toLowerCase().endsWith('.pdf')
        }));

        const mappedAwards = awardsData.map(a => ({
          id: `award-${a.AwardId || Math.random()}`,
          title: a.AwardTitle,
          file: a.AwardFile,
          no: a.AwardNo,
          type: 'award',
          isPdf: a.AwardFile?.toLowerCase().endsWith('.pdf')
        }));

        // Remove duplicates if any
        const seenIds = new Set();
        const combined = [...mappedCerts, ...mappedAwards].filter(item => {
          if (seenIds.has(item.id)) return false;
          seenIds.add(item.id);
          return true;
        });

        setItems(combined);
      } catch (err) {
        console.error('Error fetching awards and certificates:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const resolveImagePath = (path) => {
    if (!path) return '/AdImage/noimage.png';
    return path.replace('~/', '/');
  };

  const filteredItems = items.filter(item => activeTab === 'all' || item.type === activeTab);

  // Dynamic content based on active tab for the Hero section
  const heroContent = {
    all: {
      title: 'Excellence & Quality Standards',
      subtitle: 'Explore our portfolio of quality certifications, prestigious awards, and milestones celebrating our journey.',
      icon: <Star size={48} className="text-accent" />
    },
    certificate: {
      title: 'Quality Certifications',
      subtitle: 'Discover our commitment to industry-leading standards, validated by global certifications for excellence, safety, and reliability.',
      icon: <ShieldCheck size={48} className="text-accent" />
    },
    award: {
      title: 'Recognitions & Awards',
      subtitle: 'Celebrating our milestones and recognitions earned from industry leaders, global clients, and partners since 1993.',
      icon: <Trophy size={48} className="text-accent" />
    }
  };

  const activeHero = heroContent[activeTab] || heroContent.all;

  return (
    <PageWrapper>
      <div className="recognition-page">
        <Helmet>
          <title>{activeHero.title} | Powerflex Industries</title>
          <meta name="description" content={activeHero.subtitle} />
        </Helmet>

        {/* Dynamic Hero Section */}
        <section className="recognition-hero gradient-bg position-relative overflow-hidden">
          <div className="hero-pattern-overlay"></div>
          <div className="container position-relative z-index-1">
            <motion.div 
              key={activeTab}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="icon-badge mb-4">
                {activeHero.icon}
              </div>
              <h1 className="text-white hero-title">{activeHero.title}</h1>
              <p className="text-white opacity-75 max-w-2xl mx-auto hero-subtitle">
                {activeHero.subtitle}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Interactive Tabs Section */}
        <section className="tabs-navigation-section py-4 bg-white border-bottom">
          <div className="container">
            <div className="tabs-wrapper d-flex justify-content-center">
              <div className="glass-tabs">
                {[
                  { id: 'all', label: 'All Recognitions', icon: <Star size={16} /> },
                  { id: 'certificate', label: 'Certifications', icon: <ShieldCheck size={16} /> },
                  { id: 'award', label: 'Awards & Trophies', icon: <Trophy size={16} /> }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                    {activeTab === tab.id && (
                      <motion.div 
                        layoutId="active-pill" 
                        className="active-pill-bg"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Dynamic Masonry Grid */}
        <section className="section-padding recognition-grid-section bg-soft-gray">
          <div className="container">
            {loading ? (
              <div className="certificates-skeleton-grid">
                {[1, 2, 3, 4, 5, 6].map(n => (
                  <div key={n} className="skeleton-card" style={{ height: '420px' }}></div>
                ))}
              </div>
            ) : (
              <motion.div 
                layout 
                className="certificates-grid-premium"
              >
                <AnimatePresence mode="popLayout">
                  {filteredItems.map((item, index) => (
                    <motion.a 
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      href={resolveImagePath(item.file)}
                      target="_blank"
                      rel="noopener noreferrer"
                      key={item.id}
                      className="certificate-card-premium clickable-card"
                      style={{ textDecoration: 'none' }}
                    >
                      {item.isPdf ? (
                        <div className="certificate-image-container pdf-container">
                          <div className="pdf-badge">
                            <FileText size={64} />
                            <span className="pdf-extension">PDF</span>
                          </div>
                          <div className="pdf-hover-overlay">
                            <span>View Document</span>
                          </div>
                          <div className="certificate-tag">
                            <FileText size={16} />
                            <span>{item.type === 'certificate' ? 'Cert' : 'Award'} {item.no || index + 1}</span>
                          </div>
                        </div>
                      ) : (
                        <div className="certificate-image-container">
                          <img 
                            src={resolveImagePath(item.file)} 
                            alt={item.title} 
                            onError={(e) => { e.target.src = '/AdImage/noimage.png'; }}
                          />
                          <div className="certificate-tag">
                            {item.type === 'certificate' ? <ShieldCheck size={16} /> : <Award size={16} />}
                            <span>{item.type === 'certificate' ? 'Cert' : 'Award'} {item.no || index + 1}</span>
                          </div>
                        </div>
                      )}
                      <div className="certificate-content">
                        <span className={`item-type-badge ${item.type}`}>
                          {item.type === 'certificate' ? 'Certification' : 'Award'}
                        </span>
                        <h3>{item.title}</h3>
                        <div className="certificate-footer">
                          {item.type === 'certificate' ? (
                            <ShieldCheck size={18} className="text-accent" />
                          ) : (
                            <Trophy size={18} className="text-accent" />
                          )}
                          <span>Verified {item.type === 'certificate' ? 'Standard' : 'Achievement'}</span>
                          <ArrowRight size={16} className="arrow-hover-icon" />
                        </div>
                      </div>
                    </motion.a>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}

            {!loading && filteredItems.length === 0 && (
              <div className="empty-state text-center py-5">
                <Star size={64} className="text-muted mb-4 opacity-20" />
                <h3>No Items Found</h3>
                <p>We are constantly updating our portfolio. Check back soon!</p>
              </div>
            )}
          </div>
        </section>

        {/* Stats / Trust Section */}
        <section className="awards-stats-premium py-5 bg-white border-top">
          <div className="container">
            <div className="stats-grid-premium">
              <motion.div 
                whileHover={{ y: -6, scale: 1.015 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="stat-card-premium"
              >
                <div className="stat-icon-wrapper-premium">
                  <Star size={26} />
                </div>
                <div className="stat-info-premium">
                  <h4>Top Rated</h4>
                  <p>Leading assembler & supplier in India</p>
                </div>
                <div className="stat-card-glow"></div>
              </motion.div>

              <motion.div 
                whileHover={{ y: -6, scale: 1.015 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="stat-card-premium"
              >
                <div className="stat-icon-wrapper-premium">
                  <ShieldCheck size={26} />
                </div>
                <div className="stat-info-premium">
                  <h4>ISO Certified</h4>
                  <p>Quality Management standards compliant</p>
                </div>
                <div className="stat-card-glow"></div>
              </motion.div>

              <motion.div 
                whileHover={{ y: -6, scale: 1.015 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="stat-card-premium"
              >
                <div className="stat-icon-wrapper-premium">
                  <Award size={26} />
                </div>
                <div className="stat-info-premium">
                  <h4>Global Partners</h4>
                  <p>Official authorized Parker distributor & assembler</p>
                </div>
                <div className="stat-card-glow"></div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </PageWrapper>
  );
};

export default AwardsAndCertificates;
