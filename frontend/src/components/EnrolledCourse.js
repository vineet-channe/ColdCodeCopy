import React, { useRef } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { MdArrowRightAlt } from "react-icons/md";

const EnrolledCourse = ({ type }) => {
  const windowSize = useRef(window.innerWidth);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleCardClick = () => {
    navigate('/call/1848754'); // Navigate to the specified link
  };

  return (
    <section className={`featuredopp ${type}-feature relative mb-24`}>
      <div className="flex justify-center">
        <div className="featuredopp-container container bg-gradient-to-b from-[#f5fafe] to-[#ffffff] border border-[#dde5ea] rounded-[30px] p-8 max-w-[1200px]">
          <div className="featuredopp-content mb-6">
            <h2 className="font-semibold text-[28px] mb-6">Enrolled Courses</h2>
            <p className="font-normal text-[14px]"></p>
          </div>
          <Swiper
            spaceBetween={10}
            slidesPerView={windowSize.current <= 1000 ? 1 : 3}
            autoplay={{
              delay: 3500,
              disableOnInteraction: true,
            }}
            loop={true}
            modules={[Autoplay]}
            speed={800}
          >
            <SwiperSlide>
              <div
                className="featureopp-card cursor-pointer border border-[#dde5ea] rounded-[16px]"
                onClick={() =>
                  handleCardClick()
                }
              >
                <div className="featureopp-card-img shadow-[0_-0.898705px_12.5819px_rgba(39,73,125,0.1)] overflow-hidden z-0 bg-white rounded-[15px]">
                  <img
                    src="data:image/jpeg;base64,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"
                    alt="banner"
                    className="w-full max-h-full"
                  />
                </div>
                <div 
                onClick={() =>
                  handleCardClick()
                }className="featureopp-card-content p-3 flex flex-col justify-between min-h-[127px]">
                  <h4 className="font-semibold text-[14px] text-var(--primary-color)">
                    Class 9 - Trignomentry
                  </h4>
                  <div className="featureopp-card-bottom flex gap-4 items-center text-var(--primary-color)">
                    <div className="card-badge flex items-center justify-between gap-1 p-2 h-[28px] bg-[#e5f1fc] rounded-[22px]">
                      <img
                        src="https://d8it4huxumps7.cloudfront.net/uploads/images/63d1240708744_people_outline.svg"
                        alt="people"
                        className="max-h-[227px]"
                      />
                      <span>6,451 Registered</span>
                    </div>
                    <div 
                    onClick={() =>
                      handleCardClick()
                    }className="card-badge flex items-center justify-between gap-1 p-2 h-[28px] bg-[#e5f1fc] rounded-[22px]">
                      <img
                        src="https://d8it4huxumps7.cloudfront.net/uploads/images/63c699aa6a592_calendar_today.svg"
                        alt="calendar"
                      />
                      <span>1 month left</span>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            {/* Additional SwiperSlide components with similar structure */}
            <SwiperSlide>
              <div
                className="featureopp-card cursor-pointer border border-[#dde5ea] rounded-[16px]"
                onClick={() => handleCardClick("/path-to-your-aws-certification")}
              >
                <div className="featureopp-card-img shadow-[0_-0.898705px_12.5819px_rgba(39,73,125,0.1)] overflow-hidden z-0 bg-white rounded-[15px]">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYefcF7xC8hO0KRyTp0c9QV3pL00oLLZkh9g&s"
                    alt="banner"
                    className="w-full max-h-full"
                  />
                </div>
                <div className="featureopp-card-content p-3 flex flex-col justify-between min-h-[127px]">
                  <h4 className="font-semibold text-[14px] text-var(--primary-color)">
                   Class-9 Calculus series
                  </h4>
                  <div className="featureopp-card-bottom flex gap-4 items-center text-var(--primary-color)">
                    <span className="flex items-center">
                      Resume Now
                      <MdArrowRightAlt className="right-arrow text-[1.8rem]" />
                    </span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                className="featureopp-card cursor-pointer border border-[#dde5ea] rounded-[16px]"
                onClick={() => handleCardClick("/path-to-your-full-stack-data-analytics")}
              >
                <div className="featureopp-card-img shadow-[0_-0.898705px_12.5819px_rgba(39,73,125,0.1)] overflow-hidden z-0 bg-white rounded-[15px]">
                  <img
                    src="https://ineuron.ai/_next/image?url=https%3A%2F%2Fcdn.ineuron.ai%2Fassets%2Fuploads%2Fthumbnails%2F6639e1d0894c1956cb179179.jpg&w=828&q=75"
                    alt="banner"
                    className="w-full max-h-full"
                  />
                </div>
                <div className="featureopp-card-content p-3 flex flex-col justify-between min-h-[127px]">
                  <h4 className="font-semibold text-[14px] text-var(--primary-color)">
                    Full Stack - Data Analytics
                  </h4>
                  <div className="featureopp-card-bottom flex gap-4 items-center text-var(--primary-color)">
                    <div className="card-badge flex items-center justify-between gap-1 p-2 h-[28px] bg-[#e5f1fc] rounded-[22px]">
                      <img
                        src="https://d8it4huxumps7.cloudfront.net/uploads/images/63c699aa6a592_calendar_today.svg"
                        alt="calendar"
                      />
                      <span>Start Now</span>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            {/* Continue with remaining slides... */}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default EnrolledCourse;
