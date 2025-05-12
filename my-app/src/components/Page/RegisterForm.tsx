'use client';
import React from 'react';
import { useState, useRef, useEffect } from 'react';
import Card from '@/components/Atom/Card';
import TextInput from '@/components/Atom/TextInput';
import Button from '@/components/Atom/Button';
import SelectInput from '@/components/Atom/SelectInput';
import Calendar from 'react-calendar';
import { CalendarProps } from 'react-calendar';
import Radio from '@/components/Atom/Radio';
import DropDownPostalCode from '@/components/DropDownPostalCode';
import { useLanguage } from '@/app/contexts/LanguageProvider';
import Checkbox from '@/components/Atom/Checkbox';
import HashtagInput from '@/components/HashtagInput';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  useCreateTagsListByUserMutation,
  useLoginUserMutation,
  useRegisterUserMutation,
} from '@/slice/fetch';
// import { addUser } from '@/utils/actions/user/addUser';
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
  skillLevel: number;
  bio: string;
  interests: string[];
  newsletter: boolean;
  tou: boolean;
  isAdmin: boolean;
};

// type ErrorForm = {
//   errorEmptyLogin: boolean;
//   errorEmptyEmail: boolean;
//   errorEmptyFirstname: boolean;
//   errorEmptyGardenerLevel: boolean;
//   errorEmptyInterests: boolean;
//   errorEmptyLastname: boolean;
//   errorEmptyPassword: boolean;
//   errorEmptyPasswordVerify: boolean;
//   errorEmptyPostalCode: boolean;
//   errorMatchingPassword: boolean;
//   errorNotCheckedToU: boolean;
//   errorEmptyBirthDate: boolean;
//   errorSpecialCharPassword: boolean;
// };

const RegisterForm = () => {
  //#region 	VARIABLES
  const { translations } = useLanguage();
  const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
  const calendarRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [selectedSkillLevel, setSelectedSkillLevel] = useState<number>(0);

  //	https://blog.logrocket.com/using-react-usestate-object/
  const [formDataRegister, setFormDataRegister] = useState<FormData>({
    login: '',
    password: '',
    passwordVerify: '',
    firstname: '',
    lastname: '',
    email: '',
    postalCode: '',
    gender: 'M',
    birthDate: '',
    skillLevel: 0,
    bio: '',
    interests: [],
    newsletter: false,
    tou: false,
    isAdmin: false,
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

  //Variables
  const rows = 5;
  const cols = 65;

  const [isValidPostalCode, setIsValidPostalCode] = useState(true);
  const [step, setStep] = useState(1); //Pour gérer l'affichage des "pages"
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordVerify, setShowPasswordVerify] = useState(false);
  const [birthDateDisplay, setBirthDateDisplay] = useState<boolean>(false);
  const [isCheckedNewsletter, setIsCheckedNewsletter] = useState(false);
  const [isCheckedToU, setIsCheckedToU] = useState(false);

  // RTK Query
  const [registerUser] = useRegisterUserMutation();
  const [loginUser] = useLoginUserMutation();
  const [createTagsListByUser] = useCreateTagsListByUserMutation();

  //#endregion

  //#region	VALIDITY FUCTIONS
  const step1Validation = (data: Partial<FormData>) => {
    const hasEmptyFields =
      !data.login ||
      !data.password ||
      !data.passwordVerify ||
      !data.firstname ||
      !data.lastname ||
      !data.email ||
      !data.postalCode ||
      !formDataRegister.birthDate;

    //console.log('emptyfields? ', hasEmptyFields);

    const passwordValid =
      (data.password?.length ?? 0) >= 8 &&
      specialCharRegex.test(data.password ?? '');
    //console.log('passwordValid ? : ', passwordValid);

    const passwordsMatch = data.password === data.passwordVerify;
    //console.log('passwordMatch ? ', passwordsMatch);

    checkPassword(data.password ?? '');
    checkPasswordVerify(data.password ?? '', data.passwordVerify ?? '');

    const postalCodeValid = isValidPostalCode;

    return (
      !hasEmptyFields && passwordValid && passwordsMatch && postalCodeValid
    );
  };

  const step2Validation = () => {
    //console.log('check validation step 2:');

    const isValid = formDataRegister.interests.length > 0 && isCheckedToU;

    setErrorForm((prevErrorForm) => ({
      ...prevErrorForm,
      errorEmptyGardenerLevel: !formDataRegister.skillLevel,
      errorEmptyInterests: !formDataRegister.interests.length,
      errorNotCheckedToU: !isCheckedToU,
    }));

    //console.log('validation ok: ', isValid);
    return isValid;
  };

  const checkPassword = (password: string) => {
    if (password.length < 8) {
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
  // useEffect(() => {
  //   console.log('##', errorForm.errorEmptyInterests);
  //   console.log('garden', errorForm.errorEmptyGardenerLevel);
  // }, [
  //   errorForm.errorEmptyGardenerLevel,
  //   errorForm.errorEmptyInterests,
  //   errorForm.errorNotCheckedToU,
  //   step,
  // ]);
  //#endregion

  //#region NAVIGATION FUNCTION

  const formRef = useRef<HTMLFormElement>(null);

  // Fonction permettant d'avancer dans les pages
  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();

    //https://fr.react.dev/reference/react-dom/components/input#reading-the-input-values-when-submitting-a-form

    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    const formJson = Object.fromEntries(formData.entries());

    //Ajout manuel du champ birthdate (car géré par Calendar et non par un input)
    formJson.birthDate = formDataRegister.birthDate;

    //console.log('formJson page 1: ', formJson);

    setFormDataRegister((prevFormData) => ({
      ...prevFormData,
      login: formJson.login as string,
      password: formJson.password as string,
      passwordVerify: formJson.passwordVerify as string,
      birthDate: prevFormData.birthDate,
      firstname: formJson.firstname as string,
      lastname: formJson.lastname as string,
      email: formJson.email as string,
      gender: formJson.gender as string,
      postalCode: formJson.postalCode as string,
      bio: formJson.bio as string,
    }));

    if (step === 1) {
      const isValid = step1Validation(formJson);

      if (!isValid) {
        setErrorForm((prev) => ({
          ...prev,
          errorEmptyLogin: !formJson.login,
          errorEmptyPassword: !formJson.password,
          errorEmptyPasswordVerify: !formJson.passwordVerify,
          errorEmptyFirstname: !formJson.firstname,
          errorEmptyLastname: !formJson.lastname,
          errorEmptyEmail: !formJson.email,
          errorEmptyPostalCode: !formJson.postalCode,
          errorEmptyBirthDate: !formJson.birthDate,
        }));
        return;
      } else {
        // Aucune erreur, donc on les vide toutes
        setErrorForm({
          errorEmptyLogin: false,
          errorEmptyPassword: false,
          errorEmptyPasswordVerify: false,
          errorEmptyFirstname: false,
          errorEmptyLastname: false,
          errorEmptyEmail: false,
          errorEmptyPostalCode: false,
          errorEmptyBirthDate: false,
          errorEmptyGardenerLevel: false,
          errorEmptyInterests: false,
          errorMatchingPassword: false,
          errorNotCheckedToU: false,
          errorSpecialCharPassword: false,
        });
      }

      setStep((prev) => prev + 1);
    }
  };

  // Fonction permettant de reculer dans les pages
  const handlePrevStep = (e: React.FormEvent) => {
    e.preventDefault();
    setStep((prev) => prev - 1);
  };
  //#endregion

  // Fonction callback pour mettre à jour l'état des hashtags
  const handleInterestsHashtagsChange = (newHashtags: string[]) => {
    setFormDataRegister((prev) => ({
      ...prev,
      interests: newHashtags,
    }));
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
      const formattedDate = value.toISOString().split('T')[0]; //Format YYYY-MM-DD
      setFormDataRegister((prevFormData) => ({
        ...prevFormData,
        birthDate: formattedDate,
      }));
      setBirthDateDisplay(false);
    }
  };

  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = step2Validation();
    //console.log('Submit -> is valid: ', isValid);
    if (!isValid) {
      return;
    }

    if (!formRef.current) return;
    // const formData = new FormData(formRef.current);
    // const formJson = Object.fromEntries(formData.entries());

    setFormDataRegister((prevFormData) => ({
      ...prevFormData,
      newsletter: isCheckedNewsletter,
      tou: isCheckedToU,
    }));

    //console.log('FORM OK');
    const bodyRequest = {
      username: formDataRegister.login,
      password: formDataRegister.password,
      isAdmin: false,
      firstname: formDataRegister.firstname,
      lastname: formDataRegister.lastname,
      email: formDataRegister.email,
      // Postal_code: formDataRegister.postalCode, // AJOUTER POSTAL CODE DANS API
      country: 'Belgium',
      gender: formDataRegister.gender,
      birthday: formDataRegister.birthDate,
      newsletter: isCheckedNewsletter,
      skill_level: selectedSkillLevel,
      bio: formDataRegister.bio,
    };
    //console.log('formJson page 2: ', bodyRequest);

    //addUser(bodyRequest);

    //--------------------------------------------
    //IL FAUT RECUPERER LE USERID DANS LA RESPONSE
    //--------------------------------------------

    try {
      setIsSubmitting(true);
      setSubmitError(null); // reset errors

      //On créé l'utilisateur
      const response = await registerUser(bodyRequest).unwrap();
      const { id } = response.content;

      const bodyHashTagsRequest = {
        userId: id,
        hashtags: formDataRegister.interests,
      };

      //On ajoute les hashtags
      createTagsListByUser(bodyHashTagsRequest);

      try {
        loginUser({
          email: bodyRequest.email,
          password: bodyRequest.password,
        });
        console.log('user connected');
      } catch {
        console.log('error connecting user');
      }

      // const response = await fetch(process.env.NEXT_PUBLIC_API + '/user', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(bodyRequest),
      // });

      // if (!response.ok) {
      //   const errorText = await response.text();
      //   setSubmitError(
      //     `${translations.serverError} : ${response.status} - ${errorText}`
      //   );
      //   return; // STOP LA REDIRECTION
      // }

      //------------------------------------------
      // A ADAPTER SELON LA METHODE UTILISEE
      // const userData = await response.json();
      // const userId = userData?.id || 1;
      //------------------------------------------

      // if (formDataRegister.interests.length > 0) {
      //   console.log(
      //     'hashtags = ',
      //     JSON.stringify({ hashtags: formDataRegister.interests })
      //   );
      //   const hashtagResponse = await fetch(
      //     process.env.NEXT_PUBLIC_API + `/tags/list/user/${userId}`,
      //     {
      //       method: 'POST',
      //       headers: {
      //         'Content-Type': 'application/json',
      //       },
      //       body: JSON.stringify({ hashtags: formDataRegister.interests }),
      //     }
      //   );

      //   if (!hashtagResponse.ok) {
      //     const errorText = await hashtagResponse.text();
      //     setSubmitError(
      //       `⚠️ ${translations.userCreatedButNotHashtags} : ${errorText}`
      //     );
      //     return; // STOP LA REDIRECTION
      //   }
      //   console.log('Hashtags added!');
      // }
      //Redirige vers la page du dashboard

      router.push('/landing');
    } catch (error: unknown) {
      console.error('Network error :', error);
      setSubmitError(translations.networkErrorRetry);
    } finally {
      setIsSubmitting(false);
    }
  };
  //#endregion

  return (
    <Card className={'bg-cardbackground h-full max-w-screen px-8 pt-5'}>
      <h1 className="mb-5 text-4xl">{translations.register}: </h1>

      <form
        ref={formRef}
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
            autoComplete="new-password"
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
            autoComplete="new-password"
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

        <div className="relative mb-5">
          <p onClick={handleClick}>{translations.birthdate} </p>
          <p
            onClick={handleClick}
            className={` ${formDataRegister.birthDate ? 'bg-bginput text-black' : 'bg-bginput text-gray-500'} ${errorForm.errorEmptyBirthDate ? 'border-txterror border bg-transparent' : ''} cursor-pointer pl-3`}
          >
            {formDataRegister.birthDate
              ? new Date(formDataRegister.birthDate).toLocaleDateString()
              : translations.choosebirthdate}
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
                maxDate={new Date()}
              />
            </div>
          )}
          {errorForm.errorEmptyBirthDate && (
            <p className="text-txterror mb-5">{translations.errorEmptyInput}</p>
          )}
        </div>

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
        <div className="flex justify-center pb-5">
          <Button
            className="bg-bgbutton relative m-5 px-6 py-2"
            type="button"
            onClick={() => router.push('login')}
          >
            Back
          </Button>
          <Button
            className="bg-bgbutton relative m-5 px-6 py-2"
            onClick={handleNextStep}
          >
            {translations.next}
          </Button>
        </div>
      </form>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col"
        style={{ display: step === 2 ? 'block' : 'none' }}
      >
        <label htmlFor="bio">{translations.bio}</label>
        <textarea
          name="bio"
          placeholder={translations.giveaBio}
          rows={Number(rows)}
          cols={Number(cols)}
          className="row={5} mb-5 min-h-[165px] max-w-full resize-y rounded-md border-1 pl-3"
          value={formDataRegister.bio}
          onChange={(e) =>
            setFormDataRegister((prev) => ({
              ...prev,
              bio: e.target.value,
            }))
          }
        ></textarea>

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
        <SelectInput
          label={translations.skillLevel}
          name="skillLevel"
          options={[
            { value: 0, label: translations.levelbeginner },
            { value: 1, label: translations.levelintermediate },
            { value: 2, label: translations.leveladvanced },
            { value: 3, label: translations.levelexpert },
          ]}
          value={selectedSkillLevel}
          onChange={(e) => setSelectedSkillLevel(Number(e.target.value))}
        />

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
          <Checkbox
            checked={isCheckedNewsletter}
            onChange={setIsCheckedNewsletter}
          />
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
          <Button
            className="bg-bgbutton relative m-5 px-6 py-2"
            type="button"
            onClick={() => router.push('login')}
          >
            Back
          </Button>
          <Button
            className="bg-bgbutton relative m-5 px-6 py-2"
            onClick={handlePrevStep}
          >
            {translations.previous}
          </Button>
          <Button
            className="bg-bgbutton relative m-5 px-6 py-2"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {translations.sign}
          </Button>
        </div>
        {submitError && (
          <div className="mb-8 flex flex-wrap overflow-x-auto scroll-auto rounded-md bg-yellow-100 p-3 text-yellow-800 shadow">
            {submitError}
          </div>
        )}
      </form>
    </Card>
  );
};

export default RegisterForm;
