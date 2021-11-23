import React, { CSSProperties, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import './App.css';
import { UsersPage, UserViewModel } from '../../models/UserModels';
import DemoUserService from './services/DemoUserService';
import Pagination from "pagination-component";
import UserRow from './components/UserRow';
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
const tableContentsStyle:CSSProperties = {
  backgroundColor: "#fff",
  overflowY: "auto",
  flex: "1"
};
const rowWrapperStyle:CSSProperties = {
  cursor: "pointer"
};
const paginatorWrapperStyles:CSSProperties = {
  display: "flex"
}

const bottomWrapperStyle:CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "1rem"
}

const itemStyle:CSSProperties = {
  color: "black",
  cursor: "pointer",
  textAlign: "center",
  width: "2em",
  userSelect: "none"
};

const userService = new DemoUserService();
const PER_PAGE = 100;

async function getPageData(pageNumber:number): Promise<UsersPage> {
  console.log("load page "+pageNumber)
  return await userService.getUsersPage(pageNumber,PER_PAGE); 
}

function getOpenProfileHandler(user:UserViewModel): any {
  return () => {console.log(user)}
}

const App = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<UsersPage>({totalUsers:1} as UsersPage);

  async function moveToPage(pageNumber:number) {
    let page = await getPageData(pageNumber);
    setPage(page);
  }

  if (page.page === undefined) {
    moveToPage(1);
  }

  const startIdx = ((page.page-1)*page.perPage)+1;
  const endIdx = Math.min(page.page*page.perPage, page.totalUsers);
  const totalPages = Math.ceil(page.totalUsers/PER_PAGE);

  return (
    <div style={pageWrapperStyles}>
      <div style={appWrapperStyle}>
        <Router>
          <Routes>
            <Route path="/" element={<UserTable />} />
            <Route path="user/:id" element={<UserProfile />} />
          </Routes>
        </Router>
      </div>      
    </div>
  )
};

export default App;