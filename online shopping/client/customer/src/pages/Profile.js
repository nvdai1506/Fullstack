import React, { useEffect, useState } from 'react'
import Api from '../service/api';

import classes from './Profile.module.css';

function Profile() {
  const [profile, setProfile] = useState({});
  useEffect(()=>{
    Api.user.getProfile()
    .then(result =>{return result.json()})
    .then(data =>{
      // console.log(data);
      setProfile(data.user);
    })
    .catch(err=>{console.log(err)});
  },[]);
  return (
    <div className={classes.main}>
      <h1>{profile.email}</h1>
      <h1>{profile.phone}</h1>
      <h1>{profile.points}</h1>
    </div>
  )
}

export default Profile