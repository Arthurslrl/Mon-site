import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Menu from "./components/Menu";
import About from "./components/About";
import Reviews from "./components/Reviews";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function Tricolor() {
  return (
    <div className="flex h-1" aria-hidden="true">
      <div className="flex-1 bg-[#16A34A]" />
      <div className="flex-1 bg-white" />
      <div className="flex-1 bg-[#CC1F1F]" />
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
        <Reviews />
        <Tricolor />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
