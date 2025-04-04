'use client';
import React from 'react';
import { useState, useRef, useEffect, ChangeEvent, FormEvent } from 'react';
import Card from '@/components/UI/Card';
import TextInput from '@/components/UI/TextInput';
import Button from '@/components/UI/Button';
import Calendar from 'react-calendar';
import { CalendarProps } from 'react-calendar';
import Radio from '@/components/UI/Radio';
import DropDownPostalCode from '@/components/DropDownPostalCode';
import DropDown from '@/components/UI/DropDown';
import { useLanguage } from '@/app/contexts/LanguageProvider';
import Checkbox from '@/components/UI/Checkbox';
import HashtagInput from '@/components/HashtagInput';
import Link from 'next/link';
type Value = CalendarProps['value'];

type FormData = {
  login: string;
  password: string;
  passwordVerify: string;
  firstname: string;
  lastname: string;
  email: string;
  postalCode: string;
  gender: string;
  birthDate: string;
  gardenerLevel: string;
  interests: string[];
};

type ErrorForm = {
  errorEmptyLogin: boolean;
  errorEmptyEmail: boolean;
  errorEmptyFirstname: boolean;
  errorEmptyGardenerLevel: boolean;
  errorEmptyInterests: boolean;
  errorEmptyLastname: boolean;
  errorEmptyPassword: boolean;
  errorEmptyPasswordVerify: boolean;
  errorEmptyPostalCode: boolean;
  errorMatchingPassword: boolean;
  errorNotCheckedToU: boolean;
  errorEmptyBirthDate: boolean;
  errorSpecialCharPassword: boolean;
};

const RegisterForm = () => {
  //#region 	VARIABLES
  const { translations } = useLanguage();
  const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
  const calendarRef = useRef<HTMLDivElement>(null);

  //Les niveaux possible du jardinier
  const gardenerLevels = [
    translations.levelbeginner,
    translations.levelintermediate,
    translations.leveladvanced,
    translations.levelexpert,
  ];

  //	https://blog.logrocket.com/using-react-usestate-object/
  const [formDataRegister, setFormDataRegister] = useState({
    login: '',
    password: '',
    passwordVerify: '',
    firstname: '',
    lastname: '',
    email: '',
    postalCode: '',
    gender: '',
    birthDate: '',
    gardenerLevel: '',
    interests: [],
  });

  const [errorForm, setErrorForm] = useState({
    errorEmptyLogin: false,
    errorEmptyEmail: false,
    errorEmptyFirstname: false,
    errorEmptyBirthDate: false,
    errorEmptyGardenerLevel: false,
    errorEmptyInterests: false,
    errorEmptyLastname: false,
    errorEmptyPassword: false,
    errorEmptyPasswordVerify: false,
    errorEmptyPostalCode: false,
    errorMatchingPassword: false,
    errorNotCheckedToU: false,
    errorSpecialCharPassword: false,
  });

  const [isValidPostalCode, setIsValidPostalCode] = useState(true);
  const [step, setStep] = useState(1); //Pour gérer l'affichage des "pages"
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordVerify, setShowPasswordVerify] = useState(false);
  const [birthDateDisplay, setBirthDateDisplay] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isCheckedToU, setIsCheckedToU] = useState(false);

  //#endregion

  //#region	VALIDITY FUCTIONS
  const step1Validation = () => {
    // setFormData(prevFormData => ({...prevFormData ,
    // 	login : formData.login
    // }))

    const hasEmptyFields =
      !formDataRegister.login ||
      !formDataRegister.password ||
      !formDataRegister.passwordVerify ||
      !formDataRegister.firstname ||
      !formDataRegister.lastname ||
      !formDataRegister.email ||
      !formDataRegister.postalCode ||
      !formDataRegister.birthDate;

    console.log('emptyfields? ', hasEmptyFields);

    const passwordValid =
      formDataRegister.password.length > 8 &&
      specialCharRegex.test(formDataRegister.password);

    console.log('passwordValid ? : ', passwordValid);
    //AJOUTER MESSAGE D ERREUR SPECIFIQUE
    const passwordsMatch =
      formDataRegister.password === formDataRegister.passwordVerify;
    console.log('passwordMatch ? ', passwordsMatch);
    //AJOUTER MESSAGE D ERREUR SPECIFIQUE

    const postalCodeValid = isValidPostalCode;

    return (
      !hasEmptyFields && passwordValid && passwordsMatch && postalCodeValid
    );
  };
  //const calendarRef = useRef<HTMLDivElement>(null);

  const step2Validation = () => {
    console.log('check validation step 2');
    const isValid =
      formDataRegister.gardenerLevel &&
      formDataRegister.interests.length > 0 &&
      isCheckedToU;

    setErrorForm((prevErrorForm) => ({
      ...prevErrorForm,
      errorEmptyGardenerLevel: !formDataRegister.gardenerLevel,
      errorEmptyInterests: !formDataRegister.interests.length,
      errorNotCheckedToU: !isCheckedToU,
    }));

    console.log('validation ok');
    return isValid;
  };

  const checkPassword = (password: string) => {
    if (password.length <= 8) {
      setErrorForm((prevErrorForm) => ({
        ...prevErrorForm,
        errorSpecialCharPassword: true,
      }));

      return;
    }
    setErrorForm((prevErrorForm) => ({
      ...prevErrorForm,
      errorSpecialCharPassword: !specialCharRegex.test(password),
    }));
  };

  const checkPasswordVerify = (password: string, passwordVerify: string) => {
    setErrorForm((prevErrorForm) => ({
      ...prevErrorForm,
      errorMatchingPassword: password != passwordVerify,
    }));
  };

  //Réinitialisation des erreurs quand on arrive sur la page 2
  useEffect(() => {
    console.log('##', errorForm.errorEmptyInterests);
    console.log('garden', errorForm.errorEmptyGardenerLevel);
  }, [
    errorForm.errorEmptyGardenerLevel,
    errorForm.errorEmptyInterests,
    errorForm.errorNotCheckedToU,
    step,
  ]);
  //#endregion

  //#region NAVIGATION FUNCTION

  useEffect(() => {
    if (step === 1) {
      const isValid = step1Validation();
      if (!isValid) {
        setErrorForm((prev) => ({
          ...prev,
          errorEmptyLogin: !formDataRegister.login,
          errorEmptyPassword: !formDataRegister.password,
          errorEmptyPasswordVerify: !formDataRegister.passwordVerify,
          errorEmptyFirstname: !formDataRegister.firstname,
          errorEmptyLastname: !formDataRegister.lastname,
          errorEmptyEmail: !formDataRegister.email,
          errorEmptyPostalCode: !formDataRegister.postalCode,
          errorEmptyBirthDate: !formDataRegister.birthDate,
        }));
      } else {
        setStep((prev) => prev + 1);
      }
    }
  }, [formDataRegister]);

  // Fonction permettant d'avancer dans les pages
  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();

    //https://fr.react.dev/reference/react-dom/components/input#reading-the-input-values-when-submitting-a-form
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);

    setFormDataRegister((prevFormData) => ({
      ...prevFormData,
      login: formJson.login as string,
      password: formJson.password as string,
      passwordVerify: formJson.passwordVerify as string,
      firstname: formJson.firstname as string,
      lastname: formJson.lastname as string,
      email: formJson.email as string,
      gender: formJson.gender as string,
      postalCode: formJson.postalCode as string,
    }));

    console.log('login: ', formDataRegister.login);
    console.log('password: ', formDataRegister.password);
    console.log('verifyPassword: ', formDataRegister.passwordVerify);
    console.log('firstname: ', formDataRegister.firstname);
    console.log('lastname: ', formDataRegister.lastname);
    console.log('email: ', formDataRegister.email);
    console.log('postalCode: ', formDataRegister.postalCode);
    console.log('gender: ', formDataRegister.gender);

    if (step === 1) {
      const isValid = step1Validation();
      console.log('Validation step 1 result:', isValid);

      if (!isValid) {
        setErrorForm((prev) => ({
          ...prev,
          errorEmptyLogin: !formDataRegister.login,
          errorEmptyPassword: !formDataRegister.password,
          errorEmptyPasswordVerify: !formDataRegister.passwordVerify,
          errorEmptyFirstname: !formDataRegister.firstname,
          errorEmptyLastname: !formDataRegister.lastname,
          errorEmptyEmail: !formDataRegister.email,
          errorEmptyPostalCode: !formDataRegister.postalCode,
          errorEmptyBirthDate: !formDataRegister.birthDate,
        }));
        return;
      }
    }
    setStep((prev) => prev + 1);
  };

  // Fonction permettant de reculer dans les pages
  const handlePrevStep = () => {
    setStep((prev) => prev - 1);
  };
  //#endregion

  // Fonction callback pour mettre à jour l'état des hashtags
  const handleInterestsHashtagsChange = (newHashtags: string[]) => {
    setFormData.interests(newHashtags);
  };

  //#region PASSWORD VISIBILITY
  //Set si le password est visible ou pas
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  //Set si le password de confirmation est visible ou pas
  const togglePasswordVerifyVisibility = () => {
    setShowPasswordVerify(!showPasswordVerify);
  };

  //#endregion

  //#region  Gérer le clic en dehors du calendrier
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setBirthDateDisplay(false);
      }
    };
    if (birthDateDisplay) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [birthDateDisplay]);
  const handleClick = () => {
    setBirthDateDisplay((prev) => !prev);
  };

  //#endregion

  const handleDateChange = (value: Value) => {
    if (value instanceof Date) {
      setFormDataRegister((prevFormData) => ({
        ...prevFormData,
        birthDate: value.toString(),
      }));
      setBirthDateDisplay(false);
    }
  };

  const handleChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: ChangeEvent<HTMLInputElement>) =>
      setter(e.target.value);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !formDataRegister.gardenerLevel ||
      !formDataRegister.interests.length ||
      !isCheckedToU
    ) {
      return;
    } else {
      console.log('FORM OK');
      const bodyRequest = {
        Username: formDataRegister.login,
        Password: formDataRegister.password,
        Firstname: formDataRegister.firstname,
        Lastname: formDataRegister.lastname,
        Email: formDataRegister.email,
        Postal_code: formDataRegister.postalCode,
        Country: 'Belgium',
        Sexe: formDataRegister.gender,
        Birthdate: formDataRegister.birthDate,
      };
      fetch(process.env.NEXT_PUBLIC_API + '/Users', {
        method: 'GET',
        body: JSON.stringify(bodyRequest),
      });
    }
  };
  //#endregion

  return (
    <Card className={'h-full max-w-screen px-8 pt-5'}>
      <h1 className="mb-5 text-4xl">{translations.signup}: </h1>

      <form
        method="post"
        onSubmit={handleNextStep}
        className="flex flex-col"
        style={{ display: step === 1 ? 'block' : 'none' }}
      >
        <TextInput
          type="text"
          label={translations.username}
          name="login"
          placeholder={translations.enterusername}
          error={errorForm.errorEmptyLogin}
        />

        <div className="relative">
          <TextInput
            type={showPassword ? 'text' : 'password'}
            label={translations.password}
            name="password"
            placeholder={translations.enterpassword}
            error={errorForm.errorEmptyPassword}
            errorPassChar={errorForm.errorSpecialCharPassword}
          />

          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute top-8.5 right-2 text-gray-500"
          >
            {showPassword ? (
              <i className="fa fa-eye-slash"></i> // Icône "œil barré"
            ) : (
              <i className="fa fa-eye"></i> // Icône "œil"
            )}
          </button>
        </div>

        <div className="relative">
          <TextInput
            type={showPasswordVerify ? 'text' : 'password'}
            label={translations.pwdverif}
            name="passwordVerify"
            placeholder={translations.enterpasswordagain}
            error={errorForm.errorEmptyPasswordVerify}
            errorPassMatch={errorForm.errorMatchingPassword}
          />

          <button
            type="button"
            onClick={togglePasswordVerifyVisibility}
            className="absolute top-8.5 right-2 text-gray-500"
          >
            {showPasswordVerify ? (
              <i className="fa fa-eye-slash"></i> // Icône "œil barré"
            ) : (
              <i className="fa fa-eye"></i> // Icône "œil"
            )}
          </button>
        </div>

        <p onClick={handleClick}>{translations.birthdate} </p>
        <p onClick={handleClick} className="bg-bginput mb-5 pl-3">
          {formDataRegister.birthDate.toString()}
        </p>

        {birthDateDisplay && (
          <div ref={calendarRef}>
            <Calendar
              onChange={handleDateChange}
              value={
                formDataRegister.birthDate
                  ? new Date(formDataRegister.birthDate)
                  : new Date()
              }
            />
          </div>
        )}
        {errorForm.errorEmptyBirthDate && (
          <p className="text-txterror">{translations.errorEmptyInput}</p>
        )}

        <TextInput
          type="text"
          label={translations.firstname}
          name="firstname"
          placeholder={translations.enterfirstname}
          error={errorForm.errorEmptyFirstname}
        />
        <TextInput
          type="text"
          label={translations.lastname}
          name="lastname"
          placeholder={translations.enterlastname}
          error={errorForm.errorEmptyLastname}
        />
        <p>{translations.gender} </p>
        <div className="flex items-center gap-4">
          <Radio
            id="M"
            name="gender"
            value="M"
            checked={formDataRegister.gender === 'M'}
            onChange={(value) =>
              setFormDataRegister((prevFormData) => ({
                ...prevFormData,
                gender: value,
              }))
            }
          />
          <Radio
            id="F"
            name="gender"
            value="F"
            checked={formDataRegister.gender === 'F'}
            onChange={(value) =>
              setFormDataRegister((prevFormData) => ({
                ...prevFormData,
                gender: value,
              }))
            }
          />
          <Radio
            id="X"
            name="gender"
            value="X"
            checked={formDataRegister.gender === 'X'}
            onChange={(value) =>
              setFormDataRegister((prevFormData) => ({
                ...prevFormData,
                gender: value,
              }))
            }
          />
        </div>
        <TextInput
          type="email"
          label={translations.email}
          name="email"
          placeholder={translations.enteremail}
          error={errorForm.errorEmptyEmail}
        />
        <DropDownPostalCode
          label={translations.postalcode}
          value={formDataRegister.postalCode}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setFormDataRegister((prev) => ({
              ...prev,
              postalCode: e.target.value,
            }));
          }}
          error={errorForm.errorEmptyPostalCode}
          setIsValidPostalCode={setIsValidPostalCode}
        />
        <Button type="submit">{translations.next}</Button>
      </form>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col"
        style={{ display: step === 2 ? 'block' : 'none' }}
      >
        {/* Vos intérêts */}
        <HashtagInput
          label={translations.yourinterests}
          name="interests"
          placeHolder={translations.addahashtag}
          onHashtagsChange={handleInterestsHashtagsChange}
          error={errorForm.errorEmptyInterests}
        />

        {/* Affichage des hashtags pour vérifier 
						<p>Hashtags sélectionnés : {interests.join(", ")}</p>
						*/}

        {/* Niveau du jardinier */}
        {/* <DropDown
							label={translations.yourlevel}
							placeholder={translations.enteryourlevel}
							options={gardenerLevels}
							selectedValue={formData.gardenerLevel}
							setSelectedValue={setGardenerLevel}
							error={errorForm.errorEmptyGardenerLevel}
						/> */}

        {/* Newsletter & Condition Générale d'Utilisation */}
        <div className="mb-2 flex items-start">
          <Checkbox checked={isChecked} onChange={setIsChecked} />
          <p className="ml-2">{translations.newsletter}</p>
        </div>
        <div className="mb-0 flex items-start">
          <Checkbox checked={isCheckedToU} onChange={setIsCheckedToU} />
          <p className="ml-2">
            {translations.agree}
            <Link
              href="/cgu"
              legacyBehavior
              className="text-blue-500 underline"
            >
              <a target="_blank" className="text-blue-500 underline">
                {translations.cgu}
              </a>
            </Link>
          </p>
        </div>
        {errorForm.errorNotCheckedToU && (
          <p className="text-txterror">{translations.errorNotCheckedToU}</p>
        )}
        <div className="flex justify-center pb-5">
          <Button type="action" handleAction={handlePrevStep}>
            {translations.previous}
          </Button>

          <Button
            type="submit"
            handleSubmit={(e) =>
              handleSubmit(e as unknown as FormEvent<HTMLFormElement>)
            }
          >
            {translations.sign}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default RegisterForm;
