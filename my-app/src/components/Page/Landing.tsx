import React from 'react';
import Card from '../Atom/Card';
import SlimCard from '../Atom/SlimCard';
import Button from '../Atom/Button';

const Landing = () => {
  return (
    <Card className="relative flex h-screen w-screen flex-col items-center justify-center">
      <div className="absolute h-screen w-screen opacity-100">
        <img
          src={'/image/divers/gifs/landing.gif'}
          alt={'Loading...'}
          className="absolute -top-0 -right-0 h-[100vh] w-[100vh] overflow-visible object-cover"
        />
        <img
          src={'/image/divers/gifs/loading.gif'}
          alt={'Loading...'}
          className="absolute top-35 -right-25 h-[70vh] w-[100vh] overflow-visible object-cover"
        />
      </div>

      <div className="flex h-[60vh] w-[70vw] flex-col items-center justify-center p-10 opacity-100">
        <Button className="bg-bgbutton relative m-2 h-[10vh] w-[50vw]">
          Garden
        </Button>
        <Button className="bg-bgbutton relative m-2 h-[10vh] w-[50vw]">
          Explore
        </Button>
        <Button className="bg-bgbutton relative m-2 h-[10vh] w-[50vw]">
          Profile
        </Button>
        <Button className="bg-bgbutton relative m-2 h-[10vh] w-[50vw]">
          Parametre
        </Button>
      </div>
    </Card>
  );
};

export default Landing;
