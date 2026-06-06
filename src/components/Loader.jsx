import React from 'react';
import { motion } from 'framer-motion';

const Loader = () => {
  return (
    <div className="loader-wrapper">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="loader-content"
      >
        <div className="premium-loader"></div>
        <motion.h2 
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="loader-text"
        >
          POWERFLEX
        </motion.h2>
      </motion.div>
    </div>
  );
};

export default Loader;
