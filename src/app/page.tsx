import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Schedule from "@/components/sections/Schedule";
import Testimonials from "@/components/sections/Testimonials";
import Promotions from "@/components/sections/Promotions";
import Contact from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Schedule />
      <Testimonials />
      <Promotions />
      <Contact />
    </>
  );
}
