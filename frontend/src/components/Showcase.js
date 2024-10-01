import React, { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Pagination } from "swiper/modules";

const Showcase = ({ type }) => {
  const banners = [
    "https://d2w7l1p59qkl0r.cloudfront.net/static/scholarships/banners/document_1724135183.jpg",
    "https://d2w7l1p59qkl0r.cloudfront.net/static/scholarships/banners/document_1724514207.jpg",
    "https://d2w7l1p59qkl0r.cloudfront.net/static/scholarships/banners/document_1693229524.jpg",
    "https://d2w7l1p59qkl0r.cloudfront.net/static/scholarships/banners/document_1713938369.jpg",
    "https://d2w7l1p59qkl0r.cloudfront.net/static/scholarships/banners/document_1724425696.jpg",
    "https://d2w7l1p59qkl0r.cloudfront.net/static/scholarships/banners/document_1723619324.jpg",
  ];

  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className={`relative mb-20 ${type}-showcase`}>
      <div className="flex justify-center">
        <div className="relative container max-w-[1200px]">
          <Swiper
            spaceBetween={1}
            slidesPerView={windowSize <= 1150 ? 1 : 2}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false, 
            }}
            loop={true}
            modules={[Autoplay, Pagination]}
            speed={800}
          >
            {banners.map((ele, i) => (
              <SwiperSlide key={i}>
                <img
                  className="max-w-[calc(100%-12px)] rounded-[12px] shadow-[0_0_10px_rgba(0,128,255,0.25)] bg-white w-auto h-auto my-3 mx-[6px] cursor-pointer"
                  src={ele}
                  alt="brand"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Showcase;
