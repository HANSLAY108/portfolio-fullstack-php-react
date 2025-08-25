// src/components/public/TestimonialsSection.jsx
import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { getApprovedTestimonials } from '../../api/testimonialsApi';
import { User } from 'lucide-react'; // 1. Import the User icon

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState([]);
  
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await getApprovedTestimonials();
        setTestimonials(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch testimonials", error);
      }
    };
    fetchTestimonials();
  }, []);

  if (testimonials.length === 0) return null;

  return (
    <section className="bg-gray-50 py-20 sm:py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-12">
          What Clients Say
        </h2>
        <Swiper
          modules={[Autoplay, Pagination]}
          loop={true}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index} className="pb-12 h-auto">
              <div className="bg-white p-8 rounded-lg border border-gray-200/80 shadow-sm h-full flex flex-col justify-between">
                <div>
                  {/* --- THIS IS THE CHANGED SECTION --- */}
                  <div className="mx-auto mb-6 h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200">
                    <User className="h-8 w-8 text-gray-400" />
                  </div>
                  {/* ---------------------------------- */}
                  <p className="text-gray-600 italic text-center">"{testimonial.quote}"</p>
                </div>
                <div className="mt-6 text-center">
                  <h4 className="text-lg font-bold text-primary">{testimonial.name}</h4>
                  <p className="text-gray-500 text-sm">{testimonial.title}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
export default TestimonialsSection;