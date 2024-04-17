import LeftBanner from "./components/Left-Banner";
import Navbar from "./components/Navbar";
import MainContent from "./components/MainContent";

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="mx-auto flex max-w-[1440px]">
        <LeftBanner />
        <MainContent />
      </div>
    </div>
  );
}
