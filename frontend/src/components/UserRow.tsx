import React, { CSSProperties, useState } from 'react';

import { UsersPage, UserListModel } from '../../../models/UserModels';
import { userInfo } from 'os';

const rowWrapperStyle:CSSProperties = {
    display: "grid",
    boxSizing: "border-box",
    gridTemplateColumns: "1fr 1fr 1fr",
    borderBottom: "1px solid #eee"
  };
  const cellWrapperStyle:CSSProperties = {
    padding: "10px 0",
    boxSizing: "border-box",
    borderBottom: "1px solid #eee"
  };

const UserRow = (props:{user:UserListModel}) => {
  return (
    <div style={rowWrapperStyle}>
      <div style={cellWrapperStyle}>{props.user.name}</div>
      <div style={cellWrapperStyle}>{props.user.email}</div>
      <div style={cellWrapperStyle}>{props.user.city}, {props.user.country}</div>
    </div>
    )
};

export default UserRow;