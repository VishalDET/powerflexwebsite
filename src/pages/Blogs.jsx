import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/blogs');
        setBlogs(res.data);
      } catch (err) {
        console.error('Error fetching blogs:', err);
      }
      setLoading(false);
    };
    fetchBlogs();
  }, []);

  return (
    <div className="blogs-page">
      <Helmet>
        <title>Our Blog | Powerflex Industries</title>
        <meta name="description" content="Stay updated with the latest news and insights from Powerflex Industries." />
      </Helmet>

      <div className="page-header section bg-dark text-white text-center" style={{padding: '4rem 0', marginTop: '80px', background: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url("/img/ban1.jpg") center/cover'}}>
        <div className="container">
          <h1 style={{color: 'white'}}>Industrial Insights & Blog</h1>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {loading ? (
            <div className="text-center">Loading blogs...</div>
          ) : (
            <div className="grid grid-3">
              {blogs.map((blog) => (
                <div key={blog.BlogId} className="blog-card bg-white shadow" style={{borderRadius: '8px', overflow: 'hidden', transition: 'var(--transition)'}}>
                  <div className="blog-image" style={{height: '200px', overflow: 'hidden'}}>
                    <img src={blog.ImagePath || '/AdImage/noimage.png'} alt={blog.Title} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                  </div>
                  <div className="blog-body" style={{padding: '1.5rem'}}>
                    <h4>{blog.Title}</h4>
                    <p style={{color: 'var(--text-light)', fontSize: '0.9rem', marginBottom: '1rem'}}>
                      {blog.Content ? blog.Content.substring(0, 120) + '...' : 'Read our latest blog post.'}
                    </p>
                    <Link to={`/blogs/${blog.BlogId}`} className="btn btn-primary btn-sm">Read More</Link>
                  </div>
                </div>
              ))}
            </div>
          )}
          {!loading && blogs.length === 0 && <div className="text-center">No blogs found.</div>}
        </div>
      </section>
    </div>
  );
};

export default Blogs;
