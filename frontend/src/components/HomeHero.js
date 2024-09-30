import React from "react";

const HomeHero = () => {
  const images = [
    {
      title: "learn",
      image:
        "https://cdn.unstop.com/uploads/images/home/home-hero-learn.png?d=324x406",
      link: "https://unstop.com/courses",
    },
    {
      title: "mentorships",
      image:
        "https://cdn.unstop.com/uploads/images/home/home-hero-mentorships.png?d=324x406",
      link: "https://unstop.com/mentor",
    },
    {
      title: "compete",
      image:
        "https://cdn.unstop.com/uploads/images/home/home-hero-compete.png?d=324x406",
      link: "https://unstop.com/compete",
    },
  ];

  return (
    <section className="relative py-24">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center gap-24">
        <div className="relative">
          <h1 className="font-normal text-5xl lg:text-6xl mb-11 relative">
            Connecting
            <br />
            <strong className="font-bold text-6xl lg:text-7xl">
              Talent, Colleges, Recruiters
            </strong>
            <span className="absolute bottom-[-20px] left-0 w-2/5 h-[2px] bg-[#f2c034]"></span>
          </h1>
          <p className="font-normal text-2xl">
            Explore opportunities from across the globe to learn, showcase
            skills, gain CV points, & get hired by your dream company.
          </p>
        </div>

        <div className="flex flex-col justify-center gap-5 w-[400px]"> 
          {images.map((ele) => (
            <div
              className="relative transition-transform transform hover:-translate-y-2" 
              key={ele.image}
            >
              <span className="absolute top-3 left-3 font-semibold text-md capitalize z-10"> 
                {ele.title}
              </span>
              <a href={ele.link}>
                <img
                  src={ele.image}
                  alt={ele.title}
                  className="w-full h-[150px] object-cover" 
                />
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Background Elements */}
    </section>
  );
};

export default HomeHero;
