import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/sidebar.scss";

function Sidebar() {
    
  const mainContainer = JSON.parse(localStorage.getItem("mainContainer"));
  
  const navigate = useNavigate();

  const handleClick = (path) => {
    if (path === "/") {
      localStorage.clear();
    }
    navigate(path);
  };
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-header-line"></div>
        <div className="sidebar-header-title">
          {mainContainer.header}
        </div>
      </div>
      <div>
        <img
          className="sidebar-profile-avatar"
          src={mainContainer.user.image}
          alt={mainContainer.user.alt}
        />
        <div className="sidebar-profile-name">
          {mainContainer.user.name}
        </div>
        <div className="sidebar-profile-title">
          {mainContainer.user.title}
        </div>
      </div>
      <div>
        {mainContainer.menuTabs.map((item) => (
          <div
            key={item.id}
            className="sidebar-tabs"
            onClick={() => handleClick(item.onClick)}
          >
            <img
              className="sidebar-tabs-image"
              alt={item.alt}
              src={item.image}
            />
            <div className="sidebar-tabs-text">{item.text}</div>
          </div>
        ))}
      </div>
      <div
        className="sidebar-logout"
        onClick={() => handleClick(mainContainer.logout.onClick)}
      >
        <div className="sidebar-logout-text">
          {mainContainer.logout.text}
        </div>
        <img
          className="sidebar-logout-image"
          alt={mainContainer.logout.alt}
          src={mainContainer.logout.image}
        />
      </div>
    </div>
  );
}

export default Sidebar;
