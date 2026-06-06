import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';

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

  return (
    <div className="certificates-page">
      <Helmet>
        <title>Our Certificates | Powerflex Industries</title>
        <meta name="description" content="ISO and other industrial certifications held by Powerflex Industries, ensuring world-class quality standards." />
      </Helmet>

      <div className="page-header section bg-dark text-white text-center" style={{padding: '4rem 0', marginTop: '80px', background: 'var(--primary-color)'}}>
        <div className="container">
          <h1 style={{color: 'white'}}>Quality Certifications</h1>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {loading ? (
            <div className="text-center">Loading certificates...</div>
          ) : (
            <div className="grid grid-3">
              {certificates.map((cert) => (
                <div key={cert.CertificateId} className="cert-card text-center" style={{padding: '2rem', border: '1px solid var(--gray-200)', borderRadius: '8px', cursor: 'pointer', transition: 'var(--transition)'}}>
                  <img src={cert.ImagePath || '/AdImage/noimage.png'} alt={cert.Title} style={{maxWidth: '100%', height: '300px', objectFit: 'contain', marginBottom: '1.5rem'}} />
                  <h4>{cert.Title}</h4>
                </div>
              ))}
            </div>
          )}
          {!loading && certificates.length === 0 && <div className="text-center">No certification records found.</div>}
        </div>
      </section>
    </div>
  );
};

export default Certificates;
