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

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mobile-menu"
            >
              {navLinks.map((link) => (
                <NavLink key={link.path} to={link.path} onClick={() => setIsOpen(false)}>
                  {link.name}
                </NavLink>
              ))}
              <Link to="/enquiry" className="btn-premium" style={{ margin: '1rem 2rem' }} onClick={() => setIsOpen(false)}>
                Get Quote
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Navbar;
