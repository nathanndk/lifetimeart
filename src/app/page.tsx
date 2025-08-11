import Hero from "../components/sections/hero";
import About from "../components/sections/about";
import Services from "../components/sections/services";
import Work from "../components/sections/works";
import Testimonials from "../components/sections/testimonials";
import FAQs from "../components/sections/faqs";
import Contact from "../components/sections/contact";
import Footer from "../components/sections/footer";

export default function Page() {
  return (
    <main>
      <Hero />
      <About />
      <Services />
      <Work />
      <Testimonials />
      <FAQs />
      <Contact />
      <Footer />
    </main>
  );
}
