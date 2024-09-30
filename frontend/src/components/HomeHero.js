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
      title: "practice",
      image:
        "https://cdn.unstop.com/uploads/images/home/home-hero-practice.png?d=324x406",
      link: "https://unstop.com/practice",
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
    {
      title: "jobs",
      image:
        "https://cdn.unstop.com/uploads/images/home/home-hero-jobs.png?d=324x406",
      link: "https://unstop.com/job-portal",
    },
    {
      title: "blogs",
      image:
        "https://cdn.unstop.com/uploads/images/home/home-hero-blogs.png?d=324x406",
      link: "https://unstop.com/blog",
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

        <div className="flex flex-wrap justify-center gap-5 w-[550px]">
          {images.map((ele) => (
            <div
              className="relative w-1/3 transition-transform transform hover:-translate-y-4"
              key={ele.image}
            >
              <span className="absolute top-5 left-5 font-semibold text-lg capitalize z-10">
                {ele.title}
              </span>
              <a href={ele.link}>
                <img
                  src={ele.image}
                  alt={ele.title}
                  className="w-full"
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
