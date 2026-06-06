import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Careers = () => {
  const [vacancies, setVacancies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVacancies = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/careers');
        setVacancies(res.data);
      } catch (err) {
        console.error('Error fetching vacancies:', err);
      }
      setLoading(false);
    };
    fetchVacancies();
  }, []);

  return (
    <div className="careers-page">
      <Helmet>
        <title>Careers | Join Our Team at Powerflex</title>
        <meta name="description" content="Explore career opportunities at Powerflex Industries. Join a team of professionals in the hydraulic hose industry." />
      </Helmet>

      <div className="page-header section bg-dark text-white text-center" style={{padding: '4rem 0', marginTop: '80px', background: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url("/img/ban3.jpg") center/cover'}}>
        <div className="container">
          <h1 style={{color: 'white'}}>Careers</h1>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="careers-intro text-center" style={{marginBottom: '4rem'}}>
            <h3>Join Our Team</h3>
            <p style={{maxWidth: '800px', margin: '1rem auto'}}>
              At Powerflex Industries, we are always looking for passionate and talented individuals to join our growing team. Explore our current openings below.
            </p>
          </div>

          {loading ? (
            <div className="text-center">Loading current openings...</div>
          ) : (
            <div className="vacancy-list">
              {vacancies.length > 0 ? (
                vacancies.map((job) => (
                  <div key={job.VacancyId} className="job-card shadow-sm" style={{background: 'var(--white)', padding: '2rem', borderRadius: '8px', marginBottom: '1.5rem', border: '1px solid var(--gray-200)', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <div>
                      <h4 style={{marginBottom: '0.5rem'}}>{job.Position}</h4>
                      <p className="text-light">Experience: {job.Experience} | Location: {job.Location || 'Mumbai'}</p>
                    </div>
                    <Link to="/contact" className="btn btn-primary">Apply Now</Link>
                  </div>
                ))
              ) : (
                <div className="no-jobs text-center bg-light" style={{padding: '3rem', borderRadius: '8px'}}>
                  <h4>No current openings</h4>
                  <p>But we're always interested in talent! Send your resume to info@powerflexind.com</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Careers;
