import React from 'react';
import Profile from '../Organism/Profile';

const PublicProfile = (id: number) => {
  console.log('Profile public - UserId : ', id);

  return <Profile userId={id} />;
};

export default PublicProfile;
