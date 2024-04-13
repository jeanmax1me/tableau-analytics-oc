import LeftBanner from "./components/Left-Banner";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <div className="mx-auto max-w-[1440px]">
      <Navbar />
      <LeftBanner />
    </div>
  );
}
