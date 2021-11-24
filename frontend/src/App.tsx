import React, { CSSProperties, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import UserProfile from './views/UserProfile';
import UserTable from './views/UserTable';

const pageWrapperStyles:CSSProperties = {
  background: "#eee",
  height: "100vh",
  width: "100vw",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "2rem",
  boxSizing: "border-box"
};
const appWrapperStyle:CSSProperties = {
  backgroundColor: "#fff",
  boxShadow: "0 .2rem .5rem #5552",
  border: "1px solid #eee",
  padding: "20px",
  height: "100%",
  width: "100%",
  maxWidth: "50rem",
  display: "flex",
  flexDirection: "column",
  boxSizing: "border-box"
};

const App: React.FC = () => {
  return (
    <div style={pageWrapperStyles}>
      <div style={appWrapperStyle}>
        <Router>
          <Routes>
            <Route path="/" element={<UserTable />} />
            <Route path="/:page" element={<UserTable />} />
            <Route path="user/:id" element={<UserProfile />} />
          </Routes>
        </Router>
      </div>      
    </div>
  )
};

export default App;