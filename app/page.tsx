import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Menu from "./components/Menu";
import About from "./components/About";
import Gallery from "./components/Gallery";
import Reviews from "./components/Reviews";
import Contact from "./components/Contact";
import Map from "./components/Map";
import Footer from "./components/Footer";

function Tricolor() {
  return (
    <div className="flex" aria-hidden="true">
      <div className="flex-1 h-1 bg-[#4A9040]" />
      <div className="flex-1 h-1 bg-[#F5EDD5]" />
      <div className="flex-1 h-1 bg-[#C41E1E]" />
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Tricolor />
        <Menu />
        <Tricolor />
        <About />
        <Tricolor />
        <Gallery />
        <Tricolor />
        <Reviews />
        <Tricolor />
        <Contact />
        <Tricolor />
        <Map />
      </main>
      <Footer />
    </>
  );
}
