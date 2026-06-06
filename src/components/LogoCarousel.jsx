import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';

const LogoCarousel = ({ title, logos, speed = 3000, direction = 'normal' }) => {
  return (
    <div className="logo-carousel-wrapper">
      {title && (
        <div className="container">
          <div className="carousel-header">
            <h3 className="carousel-title">{title}</h3>
            <div className="title-line"></div>
          </div>
        </div>
      )}
      
      <Swiper
        modules={[Autoplay]}
        spaceBetween={30}
        slidesPerView={2}
        autoplay={{ 
          delay: 0, 
          disableOnInteraction: false,
          reverseDirection: direction === 'reverse'
        }}
        speed={speed}
        loop={true}
        allowTouchMove={false}
        breakpoints={{
          576: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          992: { slidesPerView: 5 },
          1200: { slidesPerView: 7 },
        }}
        className="logoSwiper continuous-swiper"
      >
        {logos.map((logo, index) => (
          <SwiperSlide key={index}>
            <div className="logo-item">
              <img src={logo} alt={`Logo ${index}`} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default LogoCarousel;
