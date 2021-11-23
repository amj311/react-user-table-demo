import React, { CSSProperties, useState } from 'react';

import { UsersPage, UserViewModel } from '../../../models/UserModels';
import { userInfo } from 'os';
import { Link, useParams } from 'react-router-dom';
import DemoUserService from '../services/DemoUserService';
import moment from 'moment';

const userDataWrapper:CSSProperties = {
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  textAlign: "center",
  width: "25rem",
  margin: "0 auto",
};
const profileImage:CSSProperties = {
  width: "10rem",
  height: "10rem",
  backgroundPosition: "center",
  backgroundSize: "cover",
  borderRadius: "50%",
  border: "1px solid #eee",
  margin: "0 auto",
};
const dataRow:CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  padding: "10px 0",
  boxSizing: "border-box",
  borderBottom: "1px solid #ddd",
};

const UserProfile = () => {
  const [user, setUser] = useState<UserViewModel|undefined>(undefined);
  let { id } = useParams();

  if (!user) {
    if (!id) {
      return <div>Oops! Looks like there's no user to show!</div>
    }
    new DemoUserService().getUser(id).then(user=>{
      setUser(user);
    })
    .catch(err=>{
      return <div>Can not display user at this time.</div>
    });
    return <div>Looking for user...</div>;
  }

  console.log(user)

  return (
    <>
    <Link to="/"><h3 style={{marginTop: "0"}}>← Back to Users</h3></Link>
    <div style={userDataWrapper}>
      <div style={{...profileImage, backgroundImage: `url(${user.photo})`}}></div>
      <h1>{user.name}</h1>
      <div style={dataRow}><label>Phone: </label><span>{user.phone}</span></div>
      <div style={dataRow}><label>Email: </label><span>{user.email}</span></div>
      <div style={dataRow}><label>Birthday: </label><span>{moment(user.dob).format("MMM m, YYYY")}</span></div>
      <div style={dataRow}><label>Address: </label><span style={{textAlign: "right"}}>
        {user.street.number} {user.street.name}<br />
        {user.city}, {user.country}<br />
        {user.postcode}<br />
      </span></div>
    </div>
    </>
    )
};

export default UserProfile;