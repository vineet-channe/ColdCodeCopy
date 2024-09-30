// import DownloadApp from "../components/DownloadApp";
import FeaturedOpp from "../components/FeaturedOpp";
// import GetHired from "../components/GetHired";
import HomeHero from "../components/HomeHero";
import LPM from "../components/LPM";
import Opportunities from "../components/Opportunities";
// import OurNumbers from "../components/OurNumbers";
import Showcase from "../components/Showcase";
// import SlidingBrands from "../components/SlidingBrands";

const Home = () => {
  return (
    <div className="max-w-screen">
      <HomeHero />

      <Showcase type={"home"} />
      {/*<LPM />
      <Opportunities />*/}
      <FeaturedOpp type={"home"} />
      <FeaturedOpp type={"home"} />
    </div>
  );
};

export default Home;