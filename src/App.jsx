import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AnimatePresence } from 'framer-motion';
import MainLayout from './layouts/MainLayout';
import Loader from './components/Loader';

// Public Pages
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Infrastructure from './pages/Infrastructure';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Blogs from './pages/Blogs';
import BlogDetails from './pages/BlogDetails';
import Awards from './pages/Awards';
import Certificates from './pages/Certificates';
import Careers from './pages/Careers';
import ContactUs from './pages/ContactUs';
import Enquiry from './pages/Enquiry';
import AwardsAndCertificates from './pages/AwardsAndCertificates';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <AnimatePresence mode="wait">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<AboutUs />} />
              <Route path="infrastructure" element={<Infrastructure />} />
              <Route path="products" element={<Products />} />
              <Route path="products/:id" element={<ProductDetails />} />
              <Route path="blogs" element={<Blogs />} />
              <Route path="blogs/:id" element={<BlogDetails />} />
              <Route path="awards" element={<Awards />} />
              <Route path="certificates" element={<Certificates />} />
              <Route path="careers" element={<Careers />} />
              <Route path="contact" element={<ContactUs />} />
              <Route path="enquiry" element={<Enquiry />} />
              <Route path="awards-certificates" element={<AwardsAndCertificates />} />
            </Route>
          </Routes>
        </AnimatePresence>
      </Router>
    </HelmetProvider>
  );
}

export default App;
