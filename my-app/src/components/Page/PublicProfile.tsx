import React from 'react';
import Profile from '../Organism/Profile';

interface PublicProfileProps {
  userId: number; // Changé de 'id' à 'userId'
}

const PublicProfile: React.FC<PublicProfileProps> = ({ userId }) => {
  if (process.env.NODE_ENV === 'development') {
    // console.log('Profile public - UserId : ', userId);
  }

  return <Profile userId={userId} />;
};

export default PublicProfile;
