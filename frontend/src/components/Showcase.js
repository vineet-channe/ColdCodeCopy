import React, { useRef, useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import  { Autoplay } from "swiper/modules"; // Make sure you're importing from "swiper"
import  { Pagination } from "swiper/modules";

const Showcase = ({ type }) => {
  const banners = [
    "https://d8it4huxumps7.cloudfront.net/images/home-page-banner/63e11ac59ca18_Codegoda-2023-Unstop-1280x500.jpg?d=1266x494",
    "https://d8it4huxumps7.cloudfront.net/images/home-page-banner/63e0f87cc8f87_Rotating__5_.jpeg?d=1266x494",
    "https://d8it4huxumps7.cloudfront.net/images/home-page-banner/63e4c084079e8_Rotating__3_.jpg?d=1266x494",
    "https://d8it4huxumps7.cloudfront.net/images/home-page-banner/63a43fe8bb9b3_Rotating-Banner.jpg?d=1266x494",
    "https://d8it4huxumps7.cloudfront.net/images/home-page-banner/63f3487fee501_Homepage_Banner.png?d=1266x494",
    "https://d8it4huxumps7.cloudfront.net/images/home-page-banner/63da58d8acba8_Rotating-Banner.jpg?d=1266x494",
  ];

  const [windowSize, setWindowSize] = useState(window.innerWidth);

  // Handle window resize event
  useEffect(() => {
    const handleResize = () => setWindowSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    
    // Cleanup event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className={`relative mb-20 ${type}-showcase`}>
      <div className="relative container">
        <Swiper
          spaceBetween={1}
          slidesPerView={windowSize <= 1150 ? 1 : 2}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false, // Keeps autoplay active after interaction
          }}
          loop={true}
          modules={[Autoplay, Pagination]} // Ensure modules are imported correctly
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
    </section>
  );
};

export default Showcase;
