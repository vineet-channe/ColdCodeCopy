import React, { useRef } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { MdArrowRightAlt } from "react-icons/md";

const FeaturedOpp = ({ type }) => {
  const windowSize = useRef(window.innerWidth);

  return (
    <section className={`featuredopp ${type}-feature relative mb-24`}>
      <div className="featuredopp-container container bg-gradient-to-b from-[#f5fafe] to-[#ffffff] border border-[#dde5ea] rounded-[30px] p-8">
        <div className="featuredopp-content mb-6">
          <h2 className="font-semibold text-[28px] mb-6">Featured Opportunities</h2>
          <p className="font-normal text-[14px]">
            Participate in these exceptional opportunities curated for the
            exceptional you!
          </p>
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
            <a
              href="https://unstop.com/hackathons/codegoda-2023-agoda-600316?refId=FEHOM"
              target={"_blank"}
              rel={"noreferrer"}
            >
              <div className="featureopp-card cursor-pointer border border-[#dde5ea] rounded-[16px]">
                <div className="featureopp-card-img shadow-[0_-0.898705px_12.5819px_rgba(39,73,125,0.1)] overflow-hidden z-0 bg-white rounded-[15px]">
                  <img
                    src="https://d8it4huxumps7.cloudfront.net/uploads/images/opportunity/mobile_banner/63e102313d79b_codegoda-2023.jpg?d=413x236"
                    alt="banner"
                    className="w-full max-h-full"
                  />
                </div>
                <div className="featureopp-card-content p-3 flex flex-col justify-between min-h-[127px]">
                  <h4 className="font-semibold text-[14px] text-var(--primary-color)">
                    Agoda is back with Codegoda 2023 - Exciting rewards up for grab!!
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
                    <div className="card-badge flex items-center justify-between gap-1 p-2 h-[28px] bg-[#e5f1fc] rounded-[22px]">
                      <img
                        src="https://d8it4huxumps7.cloudfront.net/uploads/images/63c699aa6a592_calendar_today.svg"
                        alt="calendar"
                      />
                      <span>1 month left</span>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </SwiperSlide>
          {/* Add more SwiperSlides in the same structure as above */}
          <SwiperSlide>
            <a
              href="https://unstop.com/awards/2023"
              target={"_blank"}
              rel={"noreferrer"}
            >
              <div className="featureopp-card cursor-pointer border border-[#dde5ea] rounded-[16px]">
                <div className="featureopp-card-img shadow-[0_-0.898705px_12.5819px_rgba(39,73,125,0.1)] overflow-hidden z-0 bg-white rounded-[15px]">
                  <img
                    src="https://d8it4huxumps7.cloudfront.net/uploads/images/63b6573964184_newsletter.jpg?d=700x400"
                    alt="banner"
                    className="w-full max-h-full"
                  />
                </div>
                <div className="featureopp-card-content p-3 flex flex-col justify-between min-h-[127px]">
                  <h4 className="font-semibold text-[14px] text-var(--primary-color)">
                    Unstop Awards 2023 is now live!
                  </h4>
                  <div className="featureopp-card-bottom flex gap-4 items-center text-var(--primary-color)">
                    <span className="flex items-center">
                      Nominate Now
                      <MdArrowRightAlt className="right-arrow text-[1.8rem]" />
                    </span>
                  </div>
                </div>
              </div>
            </a>
          </SwiperSlide>
          {/* Repeat for other slides... */}
          <SwiperSlide>
            <a
              href="https://unstop.com/competitions/loreal-brandstorm-2023-loreal-553616?refId=FEHOM"
              target={"_blank"}
              rel={"noreferrer"}
            >
              <div className="featureopp-card cursor-pointer border border-[#dde5ea] rounded-[16px]">
                <div className="featureopp-card-img shadow-[0_-0.898705px_12.5819px_rgba(39,73,125,0.1)] overflow-hidden z-0 bg-white rounded-[15px]">
                  <img
                    src="https://d8it4huxumps7.cloudfront.net/uploads/images/opportunity/mobile_banner/639c28d07908f_loreal-brandstorm-2023.jpg?d=413x236"
                    alt="banner"
                    className="w-full max-h-full"
                  />
                </div>
                <div className="featureopp-card-content p-3 flex flex-col justify-between min-h-[127px]">
                  <h4 className="font-semibold text-[14px] text-var(--primary-color)">
                    L'Oréal Brandstorm 2023 - PPO and PPIs up for grab
                  </h4>
                  <div className="featureopp-card-bottom flex gap-4 items-center text-var(--primary-color)">
                    <div className="card-badge flex items-center justify-between gap-1 p-2 h-[28px] bg-[#e5f1fc] rounded-[22px]">
                      <img
                        src="https://d8it4huxumps7.cloudfront.net/uploads/images/63c699aa6a592_calendar_today.svg"
                        alt="calendar"
                      />
                      <span> 4 days left </span>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </SwiperSlide>
          {/* Continue with remaining slides... */}
        </Swiper>
      </div>
    </section>
  );
};

export default FeaturedOpp;
