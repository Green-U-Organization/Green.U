'use client';

import React, { ChangeEvent, FormEvent } from 'react';
import { useState } from 'react';
import Card from '@/components/Atom/Card';
import TextInput from '@/components/Atom/TextInput';
import Button from '@/components/Atom/Button';
import { useLanguage } from '@/app/contexts/LanguageProvider';
import { useRouter } from 'next/navigation';
import { setCredentials } from '../../slice/authSlice';
import { setCookie } from '../utils/cookies';

//LIGNE A SUPPRIMER UNE FOIS QUE LA ROUTE AURA ETE MISE EN PLACE
import { useLoginUserMutation } from '@/slice/fetch';
import { useDispatch } from '@/redux/store';
import { setAuthCookies } from '@/utils/authCookies';

const LoginForm = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [errorEmail, setErrorEmail] = useState<boolean>(false);
  const [errorPassword, setErrorPassword] = useState<boolean>(false);
  const { translations } = useLanguage();

  const router = useRouter();
  const dispatch = useDispatch();

  // A DEGAGER

  //RTK Queries
  const [loginUser] = useLoginUserMutation();

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setErrorEmail(false);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setErrorPassword(false);
    const newPassword = e.target.value;
    setPassword(newPassword);
    // checkPassword(newPassword);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    // checkPassword(password);
    if (!email) {
      setErrorEmail(true);
    }
    if (!password) {
      setErrorPassword(true);
    }
    // } else if (!checkPass) {
    // 	setError(true)
    // }
    else {
      setErrorEmail(false);
      setErrorPassword(false);

      // ça fonctionne. Prévoir la route pour log in!
      console.log(typeof email, email);
      console.log(typeof password, password);

      const user = {
        email: email,
        password: password,
      };

      try {
        const response = await loginUser(user).unwrap();
        console.log('login sucess');

        dispatch(
          setCredentials({
            id: response.content.id,
            user: response.content.username,
            token: response.token,
          })
        );

        setAuthCookies(
          {
            accessToken: response.token,
          },
          {
            username: response.content.username,
            id: response.content.id,
          }
        );

        router.push('./landing');
      } catch {
        console.log('error login');
      }

      // Définir la date d'expiration du cookie (10 minutes)

      // const minutes = 10; //Délais d'expiration du cookie
      // const expirationInDays = minutes / (60 * 24); // Conversion des minutes en jours (obligatoire)

      /* Définition du cookie
				expires  : la période d'expiration du cookie (en jours)
				secure   : le cookie ne sera envoyé qu'en https (si true)
				sameSite : le cookie ne sera pas envoyé si la requête vient d'un autre site (si Strict)
				*/

      // Cookies.set('userId', userId, {
      //   expires: expirationInDays,
      //   secure: true,
      //   sameSite: 'Strict',
      // });

      // Mettre à jour l'ID utilisateur dans l'état

      // setUserId(userId);
      // setError(null);

      // } catch (error) {
      //   console.error("Erreur lors du chargement de l'utilisateur :", error);
      //   setError(
      //     error instanceof Error ? error.message : 'Une erreur est survenue'
      //   );
      // }
    }
  };
  return (
    <section className="flex max-h-[calc(100vh-15px)] items-center justify-center overflow-auto">
      <Card className={'max-w-screen px-8 pt-7'}>
        {/*}flex flex-col p-5 max-w-150*/}
        <form id="loginForm" onSubmit={handleSubmit}>
          <div className="flex flex-col items-center justify-center">
            <h2 className="mb-10 text-7xl">*Green-U*</h2>

            <div className="flex flex-col justify-center">
              <TextInput
                type="email"
                label={translations.email}
                value={email}
                name="email"
                placeholder={translations.enteremail}
                onChange={handleEmailChange}
                error={errorEmail}
              />
              <br />
              <TextInput
                type="password"
                label={translations.password}
                value={password}
                name="password"
                placeholder={translations.enterpassword}
                onChange={handlePasswordChange}
                error={errorPassword}
              />
            </div>

            <div>
              {error && <p className="text-red-500">{error}</p>}

              {/*POUR TEST 
							{userId && <p>ID utilisateur : {userId}</p>}
							*/}
            </div>

            <br />
            <div className="flex flex-row justify-between pb-5">
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  handleSubmit(e as unknown as FormEvent<HTMLFormElement>);
                }}
              >
                {translations.login}
              </Button>
              <Button onClick={() => router.push('/signin')}>
                {translations.signup}
              </Button>
            </div>
          </div>
        </form>
      </Card>
    </section>
  );
};

export default LoginForm;
