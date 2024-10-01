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
                    src="https://ineuron.ai/_next/image?url=https%3A%2F%2Fcdn.ineuron.ai%2Fassets%2Fuploads%2Fthumbnails%2F65bc9edb37e49cc9dd601747.jpg&w=828&q=75"
                    alt="banner"
                    className="w-full max-h-full"
                  />
                </div>
                <div 
                onClick={() =>
                  handleCardClick()
                }className="featureopp-card-content p-3 flex flex-col justify-between min-h-[127px]">
                  <h4 className="font-semibold text-[14px] text-var(--primary-color)">
                    Deep Learning Essentials : End to End Project
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
                    src="https://ineuron.ai/_next/image?url=https%3A%2F%2Fcdn.ineuron.ai%2Fassets%2Fuploads%2Fthumbnails%2F65bc94411d54c4d3ba18635b.jpg&w=828&q=75"
                    alt="banner"
                    className="w-full max-h-full"
                  />
                </div>
                <div className="featureopp-card-content p-3 flex flex-col justify-between min-h-[127px]">
                  <h4 className="font-semibold text-[14px] text-var(--primary-color)">
                    AWS Certification
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
