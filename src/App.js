import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import Navbar from "./components/layout/navbar";
import Home from "./components/pages/Home";
import Stamp from "./components/pages/Stamp";
import Verify from "./components/pages/verify";
import Issue from "./components/pages/issue";
import License from "./components/pages/License";
import Permission from "./components/pages/Permission";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/WriteStamp/:value" element={<Stamp />} />
          <Route exact path="/WriteStamp" element={<Permission />} />
          <Route exact path="/verify" element={<Verify />} />
          <Route exact path="/issue" element={<Issue />} />
          <Route exact path="/license" element={<License />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
