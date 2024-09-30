// import DownloadApp from "../components/DownloadApp";
import EnrolledCourse from "../components/EnrolledCourse";
import LiveClass from "./LiveClass";
// import GetHired from "../components/GetHired";
import HomeHero from "../components/HomeHero";
import LPM from "../components/LPM";
import Opportunities from "../components/Opportunities";
// import OurNumbers from "../components/OurNumbers";
import Showcase from "../components/Showcase";
import NavBar from "../components/Navbar";
// import SlidingBrands from "../components/SlidingBrands";

const Home = () => {
  return (
    <div className="max-w-screen">
      <NavBar />
      <HomeHero />
      <Showcase type={"home"} />
      {/*<LPM />
      <Opportunities />*/}
      <EnrolledCourse type={"home"} />
      <LiveClass type={"home"} />
    </div>
  );
};

export default Home;