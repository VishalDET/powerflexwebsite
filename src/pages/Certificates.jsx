import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FileText, ShieldCheck, Star } from 'lucide-react';
import axios from 'axios';
import PageWrapper from '../components/PageWrapper';

const Certificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/certificates');
        setCertificates(res.data);
      } catch (err) {
        console.error('Error fetching certificates:', err);
      }
      setLoading(false);
    };
    fetchCertificates();
  }, []);

  const resolveImagePath = (path) => {
    if (!path) return '/AdImage/noimage.png';
    return path.replace('~/', '/');
  };

  const certificateArray = Array.isArray(certificates) ? certificates : (certificates?.data || []);

  return (
    <PageWrapper>
      <div className="certificates-page">
        <Helmet>
          <title>Our Certificates | Powerflex Industries</title>
          <meta name="description" content="ISO and other industrial certifications held by Powerflex Industries, ensuring world-class quality standards." />
        </Helmet>

        {/* Hero Section */}
        <section className="certificates-hero gradient-bg">
          <div className="container">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="icon-badge mb-4">
                <FileText size={48} className="text-accent" />
              </div>
              <h1 className="text-white">Quality Certifications</h1>
              <p className="text-white opacity-75 max-w-2xl mx-auto">
                Discover our commitment to industry-leading standards, validated by global
                certifications for excellence, safety, and reliability.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Certificates Grid */}
        <section className="section-padding">
          <div className="container">
            {loading ? (
              <div className="certificates-skeleton-grid">
                {[1, 2, 3, 4, 5, 6].map(n => (
                  <div key={n} className="skeleton-card" style={{ height: '400px' }}></div>
                ))}
              </div>
            ) : (
              <div className="certificates-grid-premium">
                {certificateArray.map((cert, index) => (
                  <motion.div 
                    key={cert.CertificateId}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="certificate-card-premium"
                  >
                    <div className="certificate-image-container">
                      <img 
                        src={resolveImagePath(cert.CertificateFile)} 
                        alt={cert.CertificateTitle} 
                        onError={(e) => { e.target.src = '/AdImage/noimage.png'; }}
                      />
                      <div className="certificate-tag">
                        <FileText size={16} />
                        <span>Cert {cert.CertificateNo || index + 1}</span>
                      </div>
                    </div>
                    <div className="certificate-content">
                      <h3>{cert.CertificateTitle}</h3>
                      <div className="certificate-footer">
                        <ShieldCheck size={18} className="text-accent" />
                        <span>Verified Standard</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {!loading && certificateArray.length === 0 && (
              <div className="empty-state text-center py-5">
                <Star size={64} className="text-muted mb-4 opacity-20" />
                <h3>No Certificates Found</h3>
                <p>We are constantly updating our records. Check back soon!</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </PageWrapper>
  );
};

export default Certificates;
