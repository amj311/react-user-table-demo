import React, { CSSProperties, useState } from 'react';

import { UsersPage, UserListModel } from '../../../models/UserModels';
import { userInfo } from 'os';

const rowWrapperStyle:CSSProperties = {
    display: "grid",
    boxSizing: "border-box",
    gridTemplateColumns: "1fr 2fr 1fr",
    borderBottom: "1px solid #eee"
  };
  const cellWrapperStyle:CSSProperties = {
    padding: "10px 5px",
    boxSizing: "border-box",
    borderBottom: "1px solid #eee"
  };

const UserRow = ({user}:{user:UserListModel}) => {
  return (
    <div style={rowWrapperStyle}>
      <div style={cellWrapperStyle}>{user.name}</div>
      <div style={cellWrapperStyle}>{user.email}</div>
      <div style={cellWrapperStyle}>{user.address.city}, {user.address.country}</div>
    </div>
    )
};

export default UserRow;