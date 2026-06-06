import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Award, Trophy, Star, ShieldCheck } from 'lucide-react';
import axios from 'axios';
import PageWrapper from '../components/PageWrapper';

const Awards = () => {
  const [awards, setAwards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAwards = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/awards');
        setAwards(res.data);
      } catch (err) {
        console.error('Error fetching awards:', err);
      }
      setLoading(false);
    };
    fetchAwards();
  }, []);

  const resolveImagePath = (path) => {
    if (!path) return '/AdImage/noimage.png';
    return path.replace('~/', '/');
  };

  return (
    <PageWrapper>
      <div className="awards-page">
        <Helmet>
          <title>Recognitions & Awards | Powerflex Industries</title>
          <meta name="description" content="Celebrating excellence and industry-leading performance of Powerflex Industries." />
        </Helmet>

        {/* Hero Section */}
        <section className="awards-hero gradient-bg">
          <div className="container">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="icon-badge mb-4">
                <Trophy size={48} className="text-accent" />
              </div>
              <h1 className="text-white">Excellence Recognized</h1>
              <p className="text-white opacity-75 max-w-2xl mx-auto">
                Our commitment to quality and innovation has earned us prestigious recognitions 
                from global industry leaders and partners.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Awards Grid */}
        <section className="section-padding">
          <div className="container">
            {loading ? (
              <div className="awards-skeleton-grid">
                {[1, 2, 3, 4, 5, 6].map(n => (
                  <div key={n} className="skeleton-card" style={{ height: '400px' }}></div>
                ))}
              </div>
            ) : (
              <div className="awards-grid-premium">
                {awards.map((award, index) => (
                  <motion.div 
                    key={award.AwardId}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="award-card-premium"
                  >
                    <div className="award-image-container">
                      <img 
                        src={resolveImagePath(award.AwardFile)} 
                        alt={award.AwardTitle} 
                        onError={(e) => { e.target.src = '/AdImage/noimage.png'; }}
                      />
                      <div className="award-tag">
                        <Award size={16} />
                        <span>Award {award.AwardNo}</span>
                      </div>
                    </div>
                    <div className="award-content">
                      <h3>{award.AwardTitle}</h3>
                      <div className="award-footer">
                        <ShieldCheck size={18} className="text-accent" />
                        <span>Verified Achievement</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {!loading && awards.length === 0 && (
              <div className="empty-state text-center py-5">
                <Star size={64} className="text-muted mb-4 opacity-20" />
                <h3>No Awards Found</h3>
                <p>We are constantly striving for excellence. Check back soon!</p>
              </div>
            )}
          </div>
        </section>

        {/* Stats / Trust Section */}
        <section className="awards-stats bg-soft py-5">
          <div className="container">
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-4">
              <div className="stat-item d-flex align-items-center gap-3">
                <div className="stat-icon-circle">
                  <Star className="text-accent" />
                </div>
                <div>
                  <h4 className="mb-0">Top Rated</h4>
                  <p className="mb-0 text-muted">Assembler in India</p>
                </div>
              </div>
              <div className="stat-item d-flex align-items-center gap-3">
                <div className="stat-icon-circle">
                  <ShieldCheck className="text-accent" />
                </div>
                <div>
                  <h4 className="mb-0">ISO Certified</h4>
                  <p className="mb-0 text-muted">Quality Management</p>
                </div>
              </div>
              <div className="stat-item d-flex align-items-center gap-3">
                <div className="stat-icon-circle">
                  <Award className="text-accent" />
                </div>
                <div>
                  <h4 className="mb-0">Global Partners</h4>
                  <p className="mb-0 text-muted">Parker certified</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageWrapper>
  );
};

export default Awards;
