import { useState } from "react";
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
  const [selectedTopic, setSelectedTopic] = useState("AI Solutions & Automation");
  const [selectedFounderId, setSelectedFounderId] = useState("amjad-ali");

  return (
    <div className="min-h-screen flex flex-col bg-ivory text-ink">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <Services onSelectTopic={setSelectedTopic} />
        <Projects />
        <Team onSelectFounder={setSelectedFounderId} />
        <WhyTriqon />
        <Contact
          selectedTopic={selectedTopic}
          selectedFounderId={selectedFounderId}
        />
      </main>
      <Footer />
    </div>
  );
}
