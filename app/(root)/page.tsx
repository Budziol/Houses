import Benefits from "./components/Benefits/benefits";
import Blog from "./components/Blog/blog";
import Contact from "./components/Contact/contact";
import Hero from "./components/Hero/hero";
import Offer from "./components/Offer/offer";
import Opinions from "./components/Opinions/opinions";
import Process from "./components/Process/process";

const HomePage = () => {
  return (
    <>
      <Hero />
      <Benefits />
      <Offer />
      <Process />
      <Contact />
      <Opinions />
      <Blog />
    </>
  );
};
export default HomePage;
