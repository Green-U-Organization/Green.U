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
  const [showPassword, setShowPassword] = useState(false);
  const { translations } = useLanguage();

  const router = useRouter();
  const dispatch = useDispatch();

  //RTK Queries
  const [loginUser] = useLoginUserMutation();

  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });

  interface ApiError {
    status?: number;
    data?: {
      title?: string;
    };
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>, field: string) => {
    const value = e.target.value;
    if (field === 'email') {
      setEmail(value);
    } else if (field === 'password') {
      setPassword(value);
    }
    setErrors((prev) => ({
      ...prev,
      [field]: false,
    }));
  };

  //Set si le password est visible ou pas
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    const newErrors = {
      email: !email,
      password: !password,
    };
    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (validateForm()) {
      const user = {
        email: email,
        password: password,
      };
      try {
        const response = await loginUser(user).unwrap();
        //console.log('login success');
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
      } catch (err: unknown) {
        const error = err as ApiError;
        const errorMsg =
          error?.status === 401
            ? 'Invalid email or password.'
            : error?.data?.title || 'An unknown error has occurred';
        setError(errorMsg);
        console.log('Erreur login:', error);
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

            <div className="flex w-full flex-col justify-center">
              <TextInput
                type="email"
                label={translations.email}
                value={email}
                name="email"
                placeholder={translations.enteremail}
                onChange={(e) => handleChange(e, 'email')}
                error={errors.email}
              />
            </div>

            <div className="relative flex w-full flex-col justify-center">
              <TextInput
                type={showPassword ? 'text' : 'password'}
                label={translations.password}
                value={password}
                name="password"
                placeholder={translations.enterpassword}
                onChange={(e) => handleChange(e, 'password')}
                error={errors.password}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute top-8.5 right-2 text-gray-500"
              >
                {showPassword ? (
                  <i className="fa fa-eye-slash"></i>
                ) : (
                  <i className="fa fa-eye"></i>
                )}
              </button>
            </div>

            <div>
              {error && <p className="text-txterror">{error}</p>}

              {/*POUR TEST 
							{userId && <p>ID utilisateur : {userId}</p>}
							*/}
            </div>

            <div className="flex flex-row justify-between pb-5">
              <Button
                className="bg-bgbutton relative m-5 px-6 py-2"
                type="button"
                onClick={() => router.push('/')}
              >
                {translations.back}
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
