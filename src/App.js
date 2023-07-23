import React from "react";
import './App.scss';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import LoginPage from "./component/LoginPage";
import HomePage from "./component/HomePage";
import StudentPage from "./component/StudentPage";
export default function App() {
  return (
    <div id="App">
     <Router>
        <Routes>
          <Route exact path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<HomePage />} />
          <Route path="/student" element={<StudentPage />} />
        </Routes>
    </Router>
    </div>
  );
}