

const HomeHero = () => {
  const images = [
    {
      title: "Courses",
      image:
        "https://cdn.unstop.com/uploads/images/home/home-hero-learn.png?d=324x406",
      link: "courses",
    },
    {
      title: "Mentorships",
      image:
        "https://cdn.unstop.com/uploads/images/home/home-hero-mentorships.png?d=324x406",
      link: "http://localhost:3000/mentorship",
    },
    {
      title: "Learn",
      image:
        "https://cdn.unstop.com/uploads/images/home/home-hero-compete.png?d=324x406",
      link: "http://localhost:3000/ytdashboard",
    },
  ];

  const handleLinkClick = (e, link) => {
    e.preventDefault();
    if (link === "courses") {
      window.scrollBy({
        top: 800,
        left: 0,
        behavior: "smooth",
      });
    } else {
      window.location.href = link;
    }
  };

  return (
    <section className="relative py-24">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center gap-24">
        <div className="relative">
          <h1 className="font-normal text-5xl lg:text-6xl mb-11 relative">
            Inspiring a
            <br />
            <strong className="font-bold text-6xl lg:text-7xl">
              Brighter Future
            </strong>
            <span className="absolute bottom-[-20px] left-0 w-2/5 h-[2px] bg-[#f2c034]"></span>
          </h1>
          <p className="font-normal text-2xl">
            Unlocking a world of opportunities for children, helping them learn,
            grow, and achieve their dreams through quality education and resources.
          </p>
        </div>

        <div className="flex flex-col justify-center gap-5 w-[400px]">
          {images.map((ele) => (
            <div
              className="relative overflow-hidden rounded-lg transition-transform transform hover:-translate-y-2"
              key={ele.image}
            >
              <a
                href={ele.link}
                className="block relative"
                onClick={(e) => handleLinkClick(e, ele.link)}
              >
                <img
                  src={ele.image}
                  alt={ele.title}
                  className="w-full h-[150px] object-cover transition-transform duration-300 ease-in-out"
                />
                <div className="absolute inset-0 transition-opacity duration-300 opacity-0 hover:opacity-100 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
                  <span className="text-white text-lg font-semibold z-10">
                    {ele.title}
                  </span>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default HomeHero;
