/**
 * Imports child components used to build the page layout.
 */
import LeftBanner from "./components/Left-Banner";
import Navbar from "./components/Navbar";
import MainContent from "./components/MainContent";

/**
 * Home page component that renders the main layout structure.
 * 
 * @returns {JSX.Element} - The Home page component.
 */
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
