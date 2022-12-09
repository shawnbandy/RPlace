import "leftbar.css";
import {
    RssFeed,
    Chat,
    PlayCircleFilled,
    Group,
  } from "@mui/icons-material";


export default function Sidebar() {
    return (
      <div className="sidebar">
        <div className="sidebarWrapper">
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <RssFeed className="sidebarIcon" />
              <span className="sidebarListItemText">Feed</span>
            </li>
            <li className="sidebarListItem">
              <Chat className="sidebarIcon" />
              <span className="sidebarListItemText">Chat</span>
            </li>
            <li className="sidebarListItem">
              <PlayCircleFilled className="sidebarIcon" />
              <span className="sidebarListItemText">Video</span>
            </li>
            <li className="sidebarListItem">
              <Group className="sidebarIcon" />
              <span className="sidebarListItemText">Group</span>
            </li>
          </ul>
        </div>
      </div>
    );
  }