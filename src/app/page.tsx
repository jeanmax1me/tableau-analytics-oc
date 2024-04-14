import LeftBanner from "./components/Left-Banner";
import Navbar from "./components/Navbar";
import MainContent from "./components/MainContent";



export default function Home() {
  return (
    <div className="mx-auto max-w-[1440px] flex"> 
      <LeftBanner />
      <MainContent />
    </div>
  );
}
