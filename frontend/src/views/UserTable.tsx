import React, { CSSProperties, useState } from 'react';
import { Link } from "react-router-dom";

import { UsersPage } from '../../../models/UserModels';
import DemoUserService from '../services/DemoUserService';
import Pagination from "pagination-component";
import UserRow from '../components/UserRow';

const tableContentsStyle:CSSProperties = {
  backgroundColor: "#fff",
  overflowY: "auto",
  flex: "1"
};
const rowLinkStyle:CSSProperties = {
  cursor: "pointer",
  textDecoration: "inherit",
  color: "inherit",
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

const UserTable = () => {
  const [page, setPage] = useState<UsersPage|undefined>();

  async function moveToPage(pageNumber:number) {
    let page = await userService.getUsersPage(pageNumber,PER_PAGE);
    setPage(page);
  }

  if (page === undefined) {
    moveToPage(1);
    return <div>Gathering data...</div>;
  }

  const startIdx = ((page.page-1)*page.perPage)+1;
  const endIdx = Math.min(page.page*page.perPage, page.totalUsers);
  const totalPages = Math.ceil(page.totalUsers/PER_PAGE);

  return (
    <>
      <h3 style={{marginTop:"0"}}>Users</h3>

      <div style={tableContentsStyle}>
          {!page.pageUsers ? "Gathering data..." : page.pageUsers.map(user=>(
            <Link to={'user/'+user.id} style={rowLinkStyle} key={user.id}>
              <UserRow user={user} />
            </Link>
          ))}
      </div>
      
      {!page.pageUsers ? "" :
      <div style={bottomWrapperStyle}>
        <div><b>{startIdx}</b> through <b>{endIdx}</b> of {page.totalUsers}</div>

        <div style={paginatorWrapperStyles}>
          <Pagination initialPage={1} show={5} pageCount={totalPages} onChange={moveToPage}>
            {({ setPage, page, index, currentPage, isPrev, isNext, isCurrentPage }) => {
              if (isPrev)
                return (
                  <div style={itemStyle} onClick={() => setPage({ prev: true })}>
                    ←
                  </div>
                );

              if (isNext)
                return (
                  <div style={itemStyle} onClick={() => setPage({ next: true })}>
                    →
                  </div>
                );

              return (
                <div
                  key={index}
                  style={{ ...itemStyle, fontWeight: isCurrentPage ? "bold" : "normal" }}
                  onClick={() => {
                    console.log(`Navigating from page ${currentPage} to page ${page}`);
                    setPage({ page });
                  }}>
                    {page}
                </div>
              );
            }}
          </Pagination>
        </div>
      </div>
      }
    </>
  )
};

export default UserTable;