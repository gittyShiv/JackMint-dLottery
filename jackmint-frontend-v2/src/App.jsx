import React from "react";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import Stats from "./components/Stats.jsx";
import Countdown from "./components/Countdown.jsx";
import WinnersDashboard from "./components/WinnersDashboard.jsx";
import WhyJoin from "./components/WhyJoin.jsx";
import Footer from "./components/Footer.jsx";
import EnterLottery from "./components/EnterLottery.jsx";
import ProtocolWhySection from "./components/ProtocolsWhySection.jsx";



function App() {
  return (
    <div className="min-h-screen flex flex-col bg-primary">
      <Header />
      <main className="flex-1">
        <Hero />
        <EnterLottery />
        <Stats />
        <Countdown />
        <WhyJoin />
        <WinnersDashboard />
      </main>
      <ProtocolWhySection />
      <Footer />
    </div>
  );
}

export default App;