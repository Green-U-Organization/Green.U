'use client';

import React, { ChangeEvent, FormEvent } from 'react';
import { useState } from 'react';
import Card from '@/components/Atom/Card';
import TextInput from '@/components/Atom/TextInput';
import Button from '@/components/Atom/Button';
import { useLanguage } from '@/app/contexts/LanguageProvider';
import { useRouter } from 'next/navigation';
import { setCredentials } from '../../slice/authSlice';
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
  const [errorEmailPassword, setErrorEmailPassword] = useState<boolean>(false);

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

    if (!email) {
      setErrorEmail(true);
    }
    if (!password) {
      setErrorPassword(true);
    } else {
      setErrorEmail(false);
      setErrorPassword(false);
      const user = {
        email: email,
        password: password,
      };
      try {
        const response = await loginUser(user).unwrap();
        console.log('login success');
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
            xp: response.content.id,
          }
        );

        router.push('/landing');
      } catch {
        console.log('error login');
        setErrorEmailPassword(true);
      }
    }
  };
  return (
    <section className="flex min-h-screen items-center justify-center overflow-auto">
      <Card className={'bg-cardbackground h-screen max-w-screen px-8 pt-7'}>
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
              {/* {error && <p className="text-red-500">{error}</p>} */}

              {/*POUR TEST 
							{userId && <p>ID utilisateur : {userId}</p>}
							*/}
            </div>

            <br />
            {errorEmailPassword && (
              <p className="text-red-500"> Invalid password or Email </p>
            )}
            <div className="flex flex-row justify-between pb-5">
              <Button
                className="bg-bgbutton relative m-5 px-6 py-2"
                type="button"
                onClick={() => router.push('/register')}
              >
                {translations.register}
              </Button>
              <Button
                className="bg-bgbutton relative m-5 px-6 py-2"
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  handleSubmit(e as unknown as FormEvent<HTMLFormElement>);
                }}
              >
                {translations.login}
              </Button>
            </div>
          </div>
        </form>
      </Card>
    </section>
  );
};

export default LoginForm;
