import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { FaChevronLeft } from 'react-icons/fa';

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/blogs/${id}`);
        setBlog(res.data);
      } catch (err) {
        console.error('Error fetching blog details:', err);
      }
      setLoading(false);
    };
    fetchBlog();
  }, [id]);

  if (loading) return <div className="section text-center" style={{marginTop: '100px'}}>Loading blog content...</div>;
  if (!blog) return <div className="section text-center" style={{marginTop: '100px'}}>Blog post not found. <br/><Link to="/blogs">Back to Blogs</Link></div>;

  return (
    <div className="blog-details-page">
      <Helmet>
        <title>{blog.Title} | Powerflex Blog</title>
        <meta name="description" content={blog.Content ? blog.Content.substring(0, 160) : blog.Title} />
      </Helmet>

      <div className="page-header section bg-dark text-white" style={{padding: '4rem 0', marginTop: '80px', background: 'var(--primary-color)'}}>
        <div className="container">
          <Link to="/blogs" style={{color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem'}}>
            <FaChevronLeft /> Back to Blogs
          </Link>
          <h1 style={{color: 'white'}}>{blog.Title}</h1>
        </div>
      </div>

      <section className="section">
        <div className="container" style={{maxWidth: '800px'}}>
          <div className="blog-featured-image" style={{marginBottom: '2rem'}}>
            <img 
              src={blog.ImagePath || '/AdImage/noimage.png'} 
              alt={blog.Title} 
              style={{width: '100%', borderRadius: '8px', boxShadow: 'var(--shadow)'}}
              onError={(e) => { e.target.src = '/AdImage/noimage.png'; }}
            />
          </div>
          <div className="blog-content" style={{lineHeight: '1.8', fontSize: '1.1rem', color: 'var(--text-color)', whiteSpace: 'pre-line'}}>
            {blog.Content}
          </div>
          
          <div className="blog-footer" style={{marginTop: '4rem', paddingVertical: '2rem', borderTop: '1px solid var(--gray-200)'}}>
            <p>Posted on: {blog.CreatedDate ? new Date(blog.CreatedDate).toLocaleDateString() : 'Powerflex Team'}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogDetails;
