import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ArrowLeft, ShoppingCart, CheckCircle, Info, FileText, Settings, ArrowRight } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    const fetchProductData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        let productData = res.data;
        if (Array.isArray(productData)) {
          productData = productData[0];
        } else if (productData?.data) {
          productData = Array.isArray(productData.data) ? productData.data[0] : productData.data;
        }

        setProduct(productData);
        
        // Fetch related products from same category
        if (productData && productData.Category) {
          const relatedRes = await axios.get(`http://localhost:5000/api/products?category=${productData.Category}`);
          // Filter out current product and take top 4
          const relatedArray = Array.isArray(relatedRes.data) ? relatedRes.data : (relatedRes.data?.data || []);
          setRelatedProducts(relatedArray.filter(p => p.ProductId !== parseInt(id)).slice(0, 4));
        }
      } catch (err) {
        console.error('Error fetching product details:', err);
      }
      setLoading(false);
    };
    fetchProductData();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <PageWrapper>
        <div className="loading-state" style={{ minHeight: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="loader-circle"></div>
        </div>
      </PageWrapper>
    );
  }

  if (!product) {
    return (
      <PageWrapper>
        <div className="section text-center" style={{ padding: '100px 0' }}>
          <div className="container">
            <h2>Product not found</h2>
            <p>The product you are looking for does not exist or has been moved.</p>
            <Link to="/products" className="btn btn-primary mt-4">
              <ArrowLeft size={18} style={{ marginRight: '8px' }} /> Back to Products
            </Link>
          </div>
        </div>
      </PageWrapper>
    );
  }

  const resolveImagePath = (path) => {
    if (!path) return '/AdImage/noimage.png';
    return path.replace('~/', '/');
  };

  return (
    <PageWrapper>
      <div className="product-details-page">
        <Helmet>
          <title>{`${product?.ProductName || 'Product'} | Powerflex Industries`}</title>
          <meta name="description" content={product?.Description || `Details for ${product?.ProductName || 'Product'}`} />
        </Helmet>

        {/* Breadcrumbs */}
        <div className="breadcrumb-container">
          <div className="container">
            <nav className="breadcrumb">
              <Link to="/">Home</Link>
              <ChevronRight size={14} className="breadcrumb-separator" />
              <Link to="/products">Products</Link>
              <ChevronRight size={14} className="breadcrumb-separator" />
              <span className="current">{product.Category}</span>
              <ChevronRight size={14} className="breadcrumb-separator" />
              <span className="current text-primary font-weight-bold">{product.ProductName}</span>
            </nav>
          </div>
        </div>

        <section className="product-detail-main">
          <div className="container">
            <div className="product-detail-grid">
              {/* Left Column: Image Gallery */}
              <div className="product-gallery">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="main-image-container"
                >
                  <img 
                    src={resolveImagePath(product.Image)} 
                    alt={product.ProductName} 
                    onError={(e) => { e.target.src = '/AdImage/noimage.png'; }}
                  />
                </motion.div>
              </div>

              {/* Right Column: Info */}
              <div className="product-info-premium">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="product-info-header"
                >
                  <span className="category-badge">{product.Category}</span>
                  <h1>{product.ProductName}</h1>
                  <div className="product-status-badges">
                    <span className="status-badge">
                      <CheckCircle size={16} /> Precision Engineered
                    </span>
                    <span className="status-badge" style={{ color: 'var(--primary)' }}>
                      <Settings size={16} /> {product.Subcategory}
                    </span>
                  </div>
                </motion.div>

                {/* Tabs */}
                <div className="product-tabs-container">
                  <div className="tabs-header">
                    <button 
                      className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`}
                      onClick={() => setActiveTab('description')}
                    >
                      <Info size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                      Description
                    </button>
                    {product.Features && (
                      <button 
                        className={`tab-btn ${activeTab === 'features' ? 'active' : ''}`}
                        onClick={() => setActiveTab('features')}
                      >
                        <Settings size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                        Features
                      </button>
                    )}
                    {product.Specification && (
                      <button 
                        className={`tab-btn ${activeTab === 'specs' ? 'active' : ''}`}
                        onClick={() => setActiveTab('specs')}
                      >
                        <FileText size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                        Specifications
                      </button>
                    )}
                  </div>
                  
                  <div className="tab-content">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        {activeTab === 'description' && (
                          <div>
                            <h4>Overview</h4>
                            <p style={{ whiteSpace: 'pre-line' }}>
                              {product.Description || 'High-quality industrial component designed for maximum durability and efficiency.'}
                            </p>
                          </div>
                        )}
                        {activeTab === 'features' && (
                          <div>
                            <h4>Key Features</h4>
                            <div dangerouslySetInnerHTML={{ __html: product.Features }}></div>
                          </div>
                        )}
                        {activeTab === 'specs' && (
                          <div>
                            <h4>Technical Specifications</h4>
                            <div dangerouslySetInnerHTML={{ __html: product.Specification }}></div>
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                {/* Call to Action */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="product-actions-card"
                >
                  <div className="action-content">
                    <h3>Interested in this product?</h3>
                    <p>Contact our experts for technical guidance and customized solutions.</p>
                  </div>
                  <Link to="/enquiry" className="inquiry-btn">
                    <ShoppingCart size={20} />
                    Get a Quote
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="related-products-section">
            <div className="container">
              <div className="section-header-premium">
                <h2>Related Solutions</h2>
                <Link to="/products" className="view-all">
                  View All Products <ArrowRight size={16} />
                </Link>
              </div>
              
              <div className="product-grid-premium">
                {relatedProducts.map((p, idx) => (
                  <motion.div 
                    key={p.ProductId}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    className="product-card-premium card-hover"
                  >
                    <div className="product-card-img">
                      <img 
                        src={resolveImagePath(p.Image)} 
                        alt={p.ProductName} 
                        onError={(e) => { e.target.src = '/AdImage/noimage.png'; }}
                      />
                    </div>
                    <div className="product-card-body">
                      <span className="product-tag">{p.Category}</span>
                      <h4>{p.ProductName}</h4>
                      <Link to={`/products/${p.ProductId}`} className="view-link">
                        Details <ArrowRight size={16} />
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </PageWrapper>
  );
};

export default ProductDetails;
