import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FaBars as Menu, FaXmark as X, FaPhone as Phone, FaEnvelope as Mail } from 'react-icons/fa6';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Products', path: '/products' },
    { name: 'Infrastructure', path: '/infrastructure' },
    { name: 'Awards', path: '/awards' },
    { name: 'Certificates', path: '/certificates' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="top-bar">
        <div className="container top-bar-content">
          <div className="top-info">
            <a href="tel:02267047721"><Phone size={14} /> 022 67047721</a>
            <a href="mailto:info@powerflexind.com"><Mail size={14} /> info@powerflexind.com</a>
          </div>
          <div className="top-social">
            <Link to="/enquiry" className="enquiry-link">Inquiry / Tender Box</Link>
          </div>
        </div>
      </div>

      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav-container">
          <Link to="/" className="logo">
            <img src="/img/l1.png" alt="Powerflex" />
          </Link>

          <div className="nav-desktop">
            {navLinks.map((link) => (
              <NavLink key={link.path} to={link.path} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                {link.name}
              </NavLink>
            ))}
            <Link to="/enquiry" className="btn-premium">
              Get Quote
            </Link>
          </div>

          <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Blurred Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mobile-sidebar-overlay"
              onClick={() => setIsOpen(false)}
            />

            {/* Sidebar Panel */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="mobile-sidebar"
            >
              <div className="sidebar-header">
                <Link to="/" className="sidebar-logo" onClick={() => setIsOpen(false)}>
                  <img src="/img/l1.png" alt="Powerflex Logo" />
                </Link>
                <button className="sidebar-close" aria-label="Close menu" onClick={() => setIsOpen(false)}>
                  <X size={24} />
                </button>
              </div>

              <div className="sidebar-links-wrapper">
                {navLinks.map((link, idx) => (
                  <motion.div
                    key={link.path}
                    initial={{ x: 30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 30, opacity: 0 }}
                    transition={{ delay: idx * 0.05, duration: 0.2 }}
                  >
                    <NavLink 
                      to={link.path} 
                      className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </NavLink>
                  </motion.div>
                ))}
              </div>

              <div className="sidebar-footer">
                <div className="sidebar-contact-info">
                  <a href="tel:02267047721"><Phone size={14} /> 022 67047721</a>
                  <a href="mailto:info@powerflexind.com"><Mail size={14} /> info@powerflexind.com</a>
                </div>
                <Link 
                  to="/enquiry" 
                  className="btn-premium sidebar-cta" 
                  onClick={() => setIsOpen(false)}
                >
                  Get Quote
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
