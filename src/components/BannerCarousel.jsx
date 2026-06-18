import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCreative } from 'swiper/modules';
import { motion } from 'framer-motion';
import { FaArrowRight as ArrowRight, FaShield as ShieldCheck, FaBolt as Zap, FaGlobe as Globe } from 'react-icons/fa6';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-creative';

const BannerCarousel = () => {
  const slides = [
    {
      id: 1,
      image: '/img/banner/Banner_002.jpg',
      title: 'Precision Engineered',
      subtitle: 'Premium Hydraulic Solutions for Global Industries',
      tag: 'SINCE 1993'
    },
    {
      id: 2,
      image: '/img/banner/Banner_003.jpg',
      title: 'Powering Progress',
      subtitle: 'High Pressure Hose Assemblies & Pipe Fittings',
      tag: 'QUALITY ASSURED'
    },
    {
      id: 3,
      image: '/img/banner/Banner_006.jpg',
      title: 'Innovation Driven',
      subtitle: 'Advanced Infrastructure for World-Class Manufacturing',
      tag: 'PARKER CERTIFIED'
    },
  ];

  return (
    <div className="banner-carousel">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectCreative]}
        effect="creative"
        creativeEffect={{
          prev: { shadow: true, translate: [0, 0, -400] },
          next: { translate: ['100%', 0, 0] },
        }}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        loop={true}
        className="mySwiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="slide-item">
              <div className="slide-bg-wrapper">
                <img src={slide.image} alt={slide.title} className="slide-bg" />
                {/* <div className="slide-overlay-gradient"></div> */}
              </div>

              <div className="container slide-content-container">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="slide-content"
                >
                  {/* <span className="slide-tag">{slide.tag}</span>
                  <h2 className="slide-title">{slide.title}</h2>
                  <p className="slide-subtitle">{slide.subtitle}</p>
                  <div className="slide-actions">
                    <button className="btn-premium">
                      Explore Products <ArrowRight size={20} />
                    </button>
                    <button className="btn-outline">
                      Our Infrastructure
                    </button>
                  </div> */}
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BannerCarousel;
