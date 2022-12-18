import Navbar from "../../components/navbar/navbar";
import Feed from "../../components/feed/feed";
import Rightbar from "../../components/rightbar/rightbar";
import Leftbar from "../../components/leftbar/leftbar";
import "./home.css"

export default function Home() {
  return (
    <>
      <Navbar />
      <Feed />
    </>
  );
}