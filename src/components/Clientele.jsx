import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectCards } from 'swiper/modules';
import { motion } from 'framer-motion';
import { FaStar, FaQuoteLeft } from 'react-icons/fa6';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-cards';

const reviews = [
  {
    id: 1,
    name: "James Wilson",
    company: "Apex Manufacturing",
    rating: 5,
    text: "Powerflex Industries has been our go-to supplier for high-pressure hose assemblies. Their quality assurance is unmatched and deliveries are always on time.",
    initials: "JW"
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    company: "Global Hydraulics Ltd",
    rating: 5,
    text: "We've partnered with Powerflex for over a decade. Their engineering team is brilliant and provides custom solutions that fit perfectly into our heavy machinery.",
    initials: "SJ"
  },
  {
    id: 3,
    name: "Michael Chang",
    company: "TechFlow Systems",
    rating: 5,
    text: "Outstanding durability in extreme conditions. The Parker certified fittings they provide have significantly reduced our maintenance downtime.",
    initials: "MC"
  },
  {
    id: 4,
    name: "Elena Rodriguez",
    company: "EcoBuild Equipment",
    rating: 5,
    text: "Top-tier service and premium products. Their 2400 max bar pressure hoses perform flawlessly under rigorous testing.",
    initials: "ER"
  }
];

const Clientele = () => {
  return (
    <section className="clientele-section section-padding">
      <div className="container">
        <div className="text-center section-header-centered">
          <span className="section-tag">TESTIMONIALS</span>
          <h2 className="section-title">What Our <span className="gradient-text">Clients Say</span></h2>
          <p className="section-desc mx-auto">
            Don't just take our word for it. Hear from our global partners who rely on our precision engineering every day.
          </p>
        </div>

        <div className="reviews-container">
          <Swiper
            effect={'cards'}
            grabCursor={true}
            cardsEffect={{
              slideShadows: false,
            }}
            modules={[EffectCards, Pagination, Autoplay]}
            pagination={{ clickable: true, dynamicBullets: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            className="reviews-swiper"
          >
            {reviews.map((review) => (
              <SwiperSlide key={review.id}>
                <motion.div
                  className="review-card"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <FaQuoteLeft className="quote-icon" />
                  <div className="stars">
                    {[...Array(review.rating)].map((_, i) => (
                      <FaStar key={i} className="star-icon" />
                    ))}
                  </div>
                  <p className="review-text">"{review.text}"</p>
                  <div className="reviewer-info">
                    <div className="reviewer-avatar">{review.initials}</div>
                    <div className="reviewer-details">
                      <h4>{review.name}</h4>
                      <span>{review.company}</span>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Clientele;
