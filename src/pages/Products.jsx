import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, ChevronRight, ArrowRight, LayoutGrid, X } from 'lucide-react';
import axios from 'axios';
import PageWrapper from '../components/PageWrapper';

const Products = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    setLoading(true);
    try {
      const [catRes, prodRes] = await Promise.all([
        axios.get('http://localhost:5000/api/categories'),
        axios.get('http://localhost:5000/api/products')
      ]);
      setCategories(catRes.data);
      setProducts(prodRes.data);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
    setTimeout(() => setLoading(false), 800); // Slight delay for smoother animation
  };

  const handleCategoryClick = async (categoryName) => {
    if (selectedCategory === categoryName) {
      setSelectedCategory(null);
      setSelectedSubcategory(null);
      fetchInitialData();
      return;
    }

    setSelectedCategory(categoryName);
    setSelectedSubcategory(null);
    setLoading(true);
    try {
      const [subRes, prodRes] = await Promise.all([
        axios.get(`http://localhost:5000/api/subcategories?category=${categoryName}`),
        axios.get(`http://localhost:5000/api/products?category=${categoryName}`)
      ]);
      setSubcategories(subRes.data);
      setProducts(prodRes.data);
    } catch (err) {
      console.error('Error filtering category:', err);
    }
    setLoading(false);
    if (window.innerWidth < 1024) setSidebarOpen(false);
  };

  const handleSubcategoryClick = async (subcategoryName) => {
    setSelectedSubcategory(subcategoryName);
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/api/products?category=${selectedCategory}&subcategory=${subcategoryName}`);
      setProducts(res.data);
    } catch (err) {
      console.error('Error filtering subcategory:', err);
    }
    setLoading(false);
    if (window.innerWidth < 1024) setSidebarOpen(false);
  };

  const filteredProducts = products.filter(p =>
    p.ProductName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.Category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const resolveImagePath = (path) => {
    if (!path) return '/AdImage/noimage.png';
    return path.replace('~/', '/');
  };

  return (
    <PageWrapper>
      <div className="products-page">
        <Helmet>
          <title>Industrial Solutions | Powerflex Industries</title>
        </Helmet>

        <div className="products-header-banner">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="products-header-content text-center"
            >
              <h1 className='text-white'>Industrial  <span className="gradient-text">Solutions</span> </h1>
              <p className="text-white opacity-75">Precision-engineered components for demanding environments</p>

              <div className="search-container">
                <Search size={22} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search products, categories or specs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </motion.div>
          </div>
        </div>

        <section className="products-main-section">
          <div className="container">
            <div className="products-main-layout">
              {/* Sidebar Mobile Toggle */}
              <div className="mobile-filter-bar d-lg-none mb-4">
                <button className="btn btn-outline-primary w-100 d-flex align-items-center justify-content-center gap-2" onClick={() => setSidebarOpen(true)}>
                  <Filter size={18} /> Filter by Category
                </button>
              </div>

              {/* Sidebar */}
              <aside className={`products-sidebar-premium ${sidebarOpen ? 'mobile-open' : ''}`}>
                <div className="sidebar-header">
                  <LayoutGrid size={22} className="text-primary" />
                  <h3>Categories</h3>
                  <button className="d-lg-none border-0 bg-transparent ms-auto" onClick={() => setSidebarOpen(false)}>
                    <X size={24} />
                  </button>
                </div>

                <ul className="category-nav">
                  <li
                    className={!selectedCategory ? 'active-parent' : ''}
                    onClick={() => { setSelectedCategory(null); setSelectedSubcategory(null); fetchInitialData(); if (window.innerWidth < 1024) setSidebarOpen(false); }}
                  >
                    <div className="cat-item">
                      <span>All Solutions</span>
                    </div>
                  </li>
                  {categories.map((cat) => (
                    <li key={cat.CategoryId} className={selectedCategory === cat.Category ? 'active-parent' : ''}>
                      <div className="cat-item" onClick={() => handleCategoryClick(cat.Category)}>
                        <span>{cat.Category}</span>
                        <ChevronRight size={16} className={`transition-all ${selectedCategory === cat.Category ? 'rotate-90' : ''}`} />
                      </div>

                      <AnimatePresence>
                        {selectedCategory === cat.Category && subcategories.length > 0 && (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="subcategory-nav"
                          >
                            {subcategories.map((sub) => (
                              <li
                                key={sub.SubcategoryId}
                                className={selectedSubcategory === sub.Subcategory ? 'active' : ''}
                                onClick={(e) => { e.stopPropagation(); handleSubcategoryClick(sub.Subcategory); }}
                              >
                                {sub.Subcategory}
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </li>
                  ))}
                </ul>
              </aside>

              {/* Main Content */}
              <div className="products-content">
                <div className="products-results-info">
                  <p>Showing {loading ? '...' : filteredProducts.length} precision components</p>
                  {selectedCategory && (
                    <div className="breadcrumb-badges">
                      <span className="badge-item">{selectedCategory}</span>
                      {selectedSubcategory && <span className="badge-item">{selectedSubcategory}</span>}
                    </div>
                  )}
                </div>

                <div className="product-grid-premium">
                  {loading ? (
                    // Skeleton Cards
                    [1, 2, 3, 4, 5, 6].map((n) => (
                      <div key={n} className="skeleton-card"></div>
                    ))
                  ) : (
                    filteredProducts.map((product, idx) => (
                      <motion.div
                        key={product.ProductId}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        viewport={{ once: true }}
                        className="product-card-premium"
                      >
                        <div className="product-card-img">
                          <img
                            src={resolveImagePath(product.Image)}
                            alt={product.ProductName}
                            onError={(e) => { e.target.src = '/AdImage/noimage.png'; }}
                          />
                        </div>
                        <div className="product-card-body">
                          <span className="product-tag">{product.Category}</span>
                          <h4>{product.ProductName}</h4>
                          <Link to={`/products/${product.ProductId}`} className="view-link">
                            Technical Specs <ArrowRight size={16} />
                          </Link>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>

                {!loading && filteredProducts.length === 0 && (
                  <div className="empty-state text-center py-5">
                    <Search size={48} className="text-muted mb-3" />
                    <h3>No products found</h3>
                    <p>Try adjusting your search query or filters.</p>
                    <button className="btn btn-primary mt-3" onClick={() => { setSearchQuery(''); fetchInitialData(); }}>Clear All Filters</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="sidebar-overlay d-lg-none"
            onClick={() => setSidebarOpen(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.5)',
              zIndex: 1000
            }}
          />
        )}
      </AnimatePresence>
    </PageWrapper>
  );
};

export default Products;
