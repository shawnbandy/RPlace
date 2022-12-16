import "./share.css";
import {
  PermMedia,
  Label,
  Room,
  EmojiEmotions,
} from "@material-ui/icons";



export default function Share() {

    return (
        <div className="share">
            <div className="shareWrapper">
              <div className="shareTop">
                <img className="shareProfileImg" src="assets/propic.jpg" alt =""/>
                <input placeholder= "What do you wanna post?" className="shareInput"/>
              </div>
              <hr className="shareHr"/>
              <div className="shareBottom">
                <div className="shareOptions">
                  <div className="shareOption">
                    <PermMedia htmlColor="red" className="shareIcon"/>
                    <span className="shareOptionText">Photo or Video</span>
                  </div>
                  <div className="shareOption">
                    <Label htmlColor="blue" className="shareIcon"/>
                    <span className="shareOptionText">Tag</span>
                  </div>
                  <div className="shareOption">
                    <Room htmlColor="green" className="shareIcon"/>
                    <span className="shareOptionText">Location</span>
                  </div>
                  <div className="shareOption">
                    <EmojiEmotions htmlColor="orange" className="shareIcon"/>
                    <span className="shareOptionText">Feelings</span>
                  </div>
                </div>
              </div>
              <button className="shareButton">Share</button>
            </div>
        </div>
      );
    }