import EnrolledCourse from "../components/EnrolledCourse";
import LiveClass from "./LiveClass";
import HomeHero from "../components/HomeHero";
import Showcase from "../components/Showcase";
import NavBar from "../components/Navbar";

const Home = () => {
  return (
    <div className="max-w-screen">
      <NavBar />
      <HomeHero />
      <Showcase type={"home"} />
      <EnrolledCourse type={"home"} />
      <LiveClass type={"home"} />
    </div>
  );
};

export default Home;