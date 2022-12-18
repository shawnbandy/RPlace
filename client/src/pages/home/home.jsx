import Navbar from "../../components/navbar/navbar";
import Feed from "../../components/feed/feed";
import Rightbar from "../../components/rightbar/rightbar";
import "./home.css"

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="homeContainer">
      <Rightbar />
        <Feed />
      </div>
    </>
  );
}