'use client';
import React from 'react';
import Cookies from 'js-cookie';
import Profile from '../Organism/Profile';

const PrivateProfile = () => {
  //USER info
  const userData = Cookies.get('user_data');
  const userCookie = userData ? JSON.parse(userData) : null;
  const id = Number(userCookie?.id);

  //DEBUG
  // console.log('userData : ', userData);
  // console.log('userCookie: ', userCookie);

  return <Profile userId={id} />;
};

export default PrivateProfile;
