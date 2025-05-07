'use client';
import Card from '../../components/Atom/Card';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import data from '../../app/data/data';
import Todo from '../../components/Molecule/Todo';
import Link from 'next/link';
import BentoCardHeader from '../../components/Molecule/BentoCardHeader';
import Cookies from 'js-cookie';
import { RootState, useSelector } from '@/redux/store';
import H1 from '../Atom/H1';

const Landing = () => {
  const [processedData, setProcessedData] = useState(data.todos);
  const [imgProfile, setImgProfile] = useState('/image/divers/profile.png');

  //Un petit custom Hook des familles?
  const userData = Cookies.get('user_data');
  const userCookie = userData ? JSON.parse(userData) : null;
  const username = userCookie?.username;

  //POUR LE TEST DE LA RECUPERATION DU COOKIE
  useEffect(() => {
    const userId = Cookies.get('userId');
    setImgProfile(
      userId ? '/image/avatars/PI_39.png' : '/image/divers/profile.png'
    );
  }, []);

  //DEBUG CREDENTIALs :
  const user = useSelector((state: RootState) => state.auth.user);
  const token = useSelector((state: RootState) => state.auth.token);
  console.log(user);
  console.log(token);

  //TODO AJOUTER RERENDER QUAND ON CHECK UN TODO
  const handleStatusChange = (id: string, newStatus: number) => {
    const updatedData = processedData.map((todo) =>
      todo.id === id ? { ...todo, status: newStatus } : todo
    );
    setProcessedData(updatedData);
  };

  useEffect(() => {
    const tempData = [...data.todos];
    tempData.sort((a, b) => b.status - a.status);
    setProcessedData([...tempData]);
  }, []);

  return (
    <Card className={'bg-cardbackground max-w-screen p-2'}>
      <H1>Salut {username}</H1>

      {/* Profile */}
      <div className="mt-5 flex h-full w-full justify-around">
        <Link href="/profile">
          <Image
            src={imgProfile}
            alt="Profile page"
            width={72}
            height={72}
            title="Profil"
            className="border-border relative rounded-full border-2 transition-all duration-50 hover:border-4"
          />
        </Link>

        {/* Post */}

        <Link href="/post">
          <Image
            src="/image/divers/post.png"
            alt="Post page"
            width={72}
            height={72}
            title="Post"
            className="border-border relative rounded-full border-2 transition-all duration-50 hover:border-4"
          />
        </Link>

        {/* Explore */}
        <Link href="/explore">
          <Image
            src="/image/divers/explore.png"
            alt="Explore page"
            width={72}
            height={72}
            title="Explore"
            className="border-border relative rounded-full border-2 transition-all duration-50 hover:border-4"
          />
        </Link>

        {/* Logout/Login */}
        <Link href="/login">
          <Image
            src="/image/divers/logged-out.png"
            alt="Login page"
            width={72}
            height={72}
            title="Login"
            className="border-border relative rounded-full border-2 transition-all duration-50 hover:border-4"
          />
        </Link>
      </div>

      {/* TodoList */}
      {/* <Card
          className={
            'bg-cardbackground col-start-1 col-end-5 row-start-2 row-end-4 grid h-full w-full grid-cols-2 grid-rows-6 gap-2 px-3'
            }
            >
            <BentoCardHeader
            className="col-start-1 col-end-3 row-start-1 row-end-2"
            containerName={'Todo'}
            pageLink={'todo'}
            ></BentoCardHeader>
            {processedData.map((todo, index) => (
              <Todo
              key={todo.id}
              itemKey={index}
              status={todo.status}
              content={todo.content}
              added={todo.update_at}
              publishBy={todo.publishBy}
              garden={todo.garden_id}
              parcel={todo.parcel_id}
              line={todo.line_id}
              id={todo.id}
              onStatusChange={handleStatusChange}
              style={{ display: index > 1 ? 'none' : 'flex' }}
              handleEdit={function (): void {
                throw new Error('Function not implemented.');
                }}
                />
                ))}
                </Card> */}

      {/* Garden */}
      {/* <Card className="bg-cardbackground col-start-1 col-end-3 row-start-4 row-end-7 h-full w-full px-3">
          <BentoCardHeader
            className="col-start-1 col-end-3 row-start-1 row-end-2"
            containerName={'Garden-manager'}
            pageLink={'garden'}
            ></BentoCardHeader>
        </Card> */}

      {/* Message */}
      {/* <Card className="bg-cardbackground col-start-1 col-end-3 row-start-7 row-end-8 h-full w-full px-3">
          <BentoCardHeader
          className="col-start-1 col-end-3 row-start-1 row-end-2"
          containerName={'Message'}
          pageLink={'message'}
          >
          Choose your Garden
          </BentoCardHeader>
          </Card> */}

      {/* Feed */}
      {/* <Card className="bg-cardbackground col-start-3 col-end-5 row-start-4 row-end-8 h-full w-full px-3">
          <BentoCardHeader
          className="col-start-1 col-end-3 row-start-1 row-end-2"
          containerName={'Feed'}
          pageLink={'feed'}
          ></BentoCardHeader>
        </Card> */}
    </Card>
  );
};

export default Landing;
