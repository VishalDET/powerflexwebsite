import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaMicrochip, FaUpload, FaPaperPlane } from 'react-icons/fa6';
import axios from 'axios';
import PageWrapper from '../components/PageWrapper';

const Enquiry = () => {
  const [formData, setFormData] = useState({
    name: '', emailId: '', contactNo: '', companyName: '', productName: '',
    size: '', temperature: '', application: '', media: '', pressure: '',
    length: '', fittingsOne: '', fittingsTwo: '', qty: '', remarks: ''
  });
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (file) data.append('drawing', file);

    try {
      const res = await axios.post('http://localhost:5000/api/enquiry', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setStatus({ type: 'success', message: 'Enquiry submitted successfully! Our technical team will review it.' });
      setFormData({
        name: '', emailId: '', contactNo: '', companyName: '', productName: '',
        size: '', temperature: '', application: '', media: '', pressure: '',
        length: '', fittingsOne: '', fittingsTwo: '', qty: '', remarks: ''
      });
      setFile(null);
    } catch (err) {
      setStatus({ type: 'error', message: 'Submission failed. Please check your connection and try again.' });
    }
    setLoading(false);
    setTimeout(() => setStatus({ type: '', message: '' }), 5000);
  };

  return (
    <PageWrapper>
      <div className="enquiry-page-premium">
        <Helmet>
          <title>Inquiry / Tender Box | Powerflex Industries</title>
        </Helmet>

        {/* Hero Section */}
        <section className="enquiry-hero gradient-bg">
          <div className="container">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <h1 className="text-white">Inquiry / <span className="gradient-text">Tender Box</span></h1>
              <p className="text-white opacity-75">Submit your technical specifications for a precision quote.</p>
            </motion.div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="enquiry-form-container card-hover"
            >
              <form onSubmit={handleSubmit} className="premium-form-complex">
                
                {/* Section 1: Personal Details */}
                <div className="form-section-v2">
                  <div className="section-header-v2">
                    <FaUser className="section-icon" />
                    <h3>Client Information</h3>
                  </div>
                  <div className="form-grid-v2">
                    <div className="input-group-v2">
                      <label>Full Name</label>
                      <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Your Name" />
                    </div>
                    <div className="input-group-v2">
                      <label>Work Email</label>
                      <input type="email" name="emailId" value={formData.emailId} onChange={handleChange} required placeholder="email@company.com" />
                    </div>
                    <div className="input-group-v2">
                      <label>Contact Number</label>
                      <input type="text" name="contactNo" value={formData.contactNo} onChange={handleChange} required placeholder="+91 ..." />
                    </div>
                    <div className="input-group-v2">
                      <label>Company Name</label>
                      <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} required placeholder="Organization Name" />
                    </div>
                  </div>
                </div>

                <div className="section-divider"></div>

                {/* Section 2: Technical Specs */}
                <div className="form-section-v2">
                  <div className="section-header-v2">
                    <FaMicrochip className="section-icon" />
                    <h3>Technical Specifications</h3>
                  </div>
                  <div className="form-grid-v2">
                    <div className="input-group-v2">
                      <label>Product Name</label>
                      <input type="text" name="productName" value={formData.productName} onChange={handleChange} required placeholder="e.g. Hydraulic Hose R2" />
                    </div>
                    <div className="input-group-v2">
                      <label>Size / ID</label>
                      <input type="text" name="size" value={formData.size} onChange={handleChange} placeholder="e.g. 1/2 Inch" />
                    </div>
                    <div className="input-group-v2">
                      <label>Working Pressure</label>
                      <input type="text" name="pressure" value={formData.pressure} onChange={handleChange} placeholder="e.g. 350 Bar" />
                    </div>
                    <div className="input-group-v2">
                      <label>Temperature Range</label>
                      <input type="text" name="temperature" value={formData.temperature} onChange={handleChange} placeholder="e.g. -40 to +100°C" />
                    </div>
                    <div className="input-group-v2">
                      <label>Application</label>
                      <input type="text" name="application" value={formData.application} onChange={handleChange} placeholder="e.g. Earthmoving" />
                    </div>
                    <div className="input-group-v2">
                      <label>Media / Fluid</label>
                      <input type="text" name="media" value={formData.media} onChange={handleChange} placeholder="e.g. Mineral Oil" />
                    </div>
                    <div className="input-group-v2">
                      <label>Assembly Length</label>
                      <input type="text" name="length" value={formData.length} onChange={handleChange} placeholder="e.g. 1500mm" />
                    </div>
                    <div className="input-group-v2">
                      <label>Quantity</label>
                      <input type="text" name="qty" value={formData.qty} onChange={handleChange} placeholder="e.g. 10 Units" />
                    </div>
                  </div>
                  <div className="form-grid-v2" style={{ marginTop: '1.5rem' }}>
                    <div className="input-group-v2">
                      <label>Fittings End 1</label>
                      <input type="text" name="fittingsOne" value={formData.fittingsOne} onChange={handleChange} placeholder="e.g. BSP Male" />
                    </div>
                    <div className="input-group-v2">
                      <label>Fittings End 2</label>
                      <input type="text" name="fittingsTwo" value={formData.fittingsTwo} onChange={handleChange} placeholder="e.g. BSP Female Swivel" />
                    </div>
                  </div>
                </div>

                <div className="section-divider"></div>

                {/* Section 3: File & Remarks */}
                <div className="form-section-v2">
                  <div className="section-header-v2">
                    <FaUpload className="section-icon" />
                    <h3>Drawings & Additional Info</h3>
                  </div>
                  <div className="file-upload-wrapper-v2">
                    <label className="file-drop-zone">
                      <input type="file" onChange={handleFileChange} />
                      <div className="drop-zone-content">
                        <FaUpload size={24} />
                        <span>{file ? file.name : 'Click to upload technical drawing (PDF/JPG)'}</span>
                      </div>
                    </label>
                  </div>
                  <div className="input-group-v2" style={{ marginTop: '1.5rem' }}>
                    <label>Remarks / Special Instructions</label>
                    <textarea 
                      name="remarks" 
                      value={formData.remarks} 
                      onChange={handleChange} 
                      rows="4" 
                      placeholder="Any other specific requirements..."
                    ></textarea>
                  </div>
                </div>

                <button type="submit" className="btn-premium w-full btn-lg" disabled={loading}>
                  {loading ? 'Submitting Inquiry...' : (
                    <>
                      Submit Technical Inquiry <FaPaperPlane />
                    </>
                  )}
                </button>

                <AnimatePresence>
                  {status.message && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className={`form-status-alert ${status.type}`}
                    >
                      {status.message}
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>
          </div>
        </section>
      </div>
    </PageWrapper>
  );
};

export default Enquiry;
