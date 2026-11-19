import { useState } from "react";
import { MotionConfig } from "framer-motion";
import { SiteContentProvider } from "@/lib/contentLoader";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Projects } from "@/components/Projects";
import { Team } from "@/components/Team";
import { WhyTriqon } from "@/components/WhyTriqon";
import { Contact } from "@/components/Contact";
import { SiteFeedback } from "@/components/SiteFeedback";
import { Footer } from "@/components/Footer";

export default function App() {
  const [selectedTopic, setSelectedTopic] = useState("AI Solutions & Automation");
  const [selectedFounderId, setSelectedFounderId] = useState("company");

  return (
    <MotionConfig reducedMotion="user">
      <SiteContentProvider>
        <div className="min-h-screen flex flex-col bg-ivory text-ink overflow-x-clip">
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:px-4 focus:py-2.5 focus:rounded-lg focus:bg-forest focus:text-ivory focus:text-sm focus:font-semibold focus:shadow-lg"
          >
            Skip to main content
          </a>
          <Navbar />
          <main id="main-content" className="flex-1">
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
            <SiteFeedback />
          </main>
          <Footer />
        </div>
      </SiteContentProvider>
    </MotionConfig>
  );
}
