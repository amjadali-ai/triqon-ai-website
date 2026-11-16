import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Projects } from "@/components/Projects";
import { Team } from "@/components/Team";
import { WhyTriqon } from "@/components/WhyTriqon";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-ivory text-ink">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <Services />
        <Projects />
        <Team />
        <WhyTriqon />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
