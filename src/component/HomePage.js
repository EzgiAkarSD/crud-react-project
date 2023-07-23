import React from "react";
import Cards from "./Cards.js";
import Sidebar from "./Sidebar";
import "../styles/homepage.scss";

function HomePage() {
  return (
    <div className="component-home">
      <Sidebar></Sidebar>
      <Cards></Cards>
    </div>
  );
}

export default HomePage;
