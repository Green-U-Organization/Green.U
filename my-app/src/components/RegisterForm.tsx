"use client";
import React from "react";
import { useState, useRef, useEffect, ChangeEvent, FormEvent} from "react";
import Card from "@/components/UI/Card";
import TextInput from "@/components/UI/TextInput";
import Button from "@/components/UI/Button";
import Calendar from "react-calendar";
import { CalendarProps } from "react-calendar";
import Radio from "@/components/UI/Radio";
import DropDownPostalCode from "@/components/DropDownPostalCode";
import DropDown from "@/components/UI/DropDown";
import { useLanguage } from '@/app/contexts/LanguageProvider';
import Checkbox from "@/components/UI/Checkbox";
import HashtagInput from "@/components/HashtagInput";
import Link from "next/link";

type Value = CalendarProps["value"];

const RegisterForm = () => {

//#region 	VARIABLES
	const {translations} = useLanguage();

	//Les niveaux possible du jardinier	
	const gardenerLevels = [
		translations.levelbeginner, 
		translations.levelintermediate, 
		translations.leveladvanced, 
		translations.levelexpert
	];

	const [step, setStep] = useState(1); //Pour gérer l'affichage des "pages"	
	const [login, setLogin] = useState("");
	const [errorEmptyLogin, setErrorEmptyLogin] = useState<boolean>(false);
	const [password, setPassword] = useState("");
	const [errorEmptyPassword, setErrorEmptyPassword] = useState<boolean>(false);
	const [passwordVerify, setPasswordVerify] = useState("");
	const [showPassword, setShowPassword] = useState(false);
    const [showPasswordVerify, setShowPasswordVerify] = useState(false);
	const [errorEmptyPasswordVerify, setErrorEmptyPasswordVerify] = useState<boolean>(false);
	const [firstname, setFirstname] = useState("");
	const [errorEmptyFirstname, setErrorEmptyFirstname] = useState<boolean>(false);
	const [lastname, setLastname] = useState("");
	const [errorEmptyLastname, setErrorEmptyLastname] =	useState<boolean>(false);
	const [email, setEmail] = useState("");
	const [errorEmptyEmail, setEmptyErrorEmail] = useState<boolean>(false);
	const [postalCode, setPostalCode] = useState("");
	const [isValidPostalCode, setIsValidPostalCode] = useState(true);
	const [errorEmptyPostalCode, setErrorEmptyPostalCode] =	useState<boolean>(false);
	const [gender, setGender] = useState("M"); // ajouter bouton radio pour définir sexe
	const [birthDate, setBirthDate] = useState(new Date());
	const [birthDateDisplay, setBirthDateDisplay] = useState<boolean>(false)
	const [errorSpecialCharPassword, setErrorSpecialCharPassword] = useState<boolean>(false);
	const [errorMatchingPassword, setErrorMatchingPassword] = useState<boolean>(false);
	const [gardenerLevel, setGardenerLevel] = useState<string>('');
	const [errorEmptyGardenerLevel, setErrorEmptyGardenerLevel] = useState<boolean>(false);
	const [isChecked, setIsChecked] = useState(false)
   	const [interests, setInterests] = useState<string[]>([]); //Pour stocker les hashtags
	const [errorEmptyInterests, setErrorEmptyInterests] = useState<boolean>(false);

//#endregion

//#region	VALIDITY FUCTIONS

	//Set si le password est visible ou pas
	const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

	//Set si le password de confirmation est visible ou pas
    const togglePasswordVerifyVisibility = () => {
        setShowPasswordVerify(!showPasswordVerify);
    };

    // Fonction callback pour mettre à jour l'état des hashtags
    const handleInterestsHashtagsChange = (newHashtags: string[]) => {
        setInterests(newHashtags);
    };
    
	//Fonction de vérification de la validité des champs obligatoires avant de pouvoir changer de page
	const validateStep = () => {
		if (step === 1) {
			console.log("checking step 1 validation")
			checkPassword(password);
			checkPasswordVerify(password, passwordVerify);
			
			const isValid = login && password && passwordVerify && firstname && lastname && email && postalCode && birthDate &&
                !errorSpecialCharPassword && !errorMatchingPassword && isValidPostalCode;

			setErrorEmptyLogin(!login);
			setErrorEmptyPassword(!password);
			setErrorEmptyPasswordVerify(!passwordVerify);
			setErrorEmptyFirstname(!firstname);
			setErrorEmptyLastname(!lastname);
			setEmptyErrorEmail(!email);
			setErrorEmptyPostalCode(!postalCode);

			console.log("validation ok")
			return isValid;
		} else if (step === 2) {

			console.log("check validation step 2")
			const isValid = gardenerLevel && interests.length > 0;
	
			setErrorEmptyGardenerLevel(!gardenerLevel);
			setErrorEmptyInterests(!interests.length);

			console.log("validation ok")
			return isValid;
		}
		return false;
	};

	//Réinitialisation des erreurs quand on arrive sur la page 2
	useEffect(() => {

			console.log("##", errorEmptyInterests)
			console.log("garden", errorEmptyGardenerLevel)
		
	}, [errorEmptyGardenerLevel, errorEmptyInterests, step]);

	//Fonction permettant d'avancer dans les pages
	const handleNextStep = () => {
		if (validateStep()) {
			if(step === 1) {
				setErrorEmptyInterests(false);
				setErrorEmptyGardenerLevel(false);
			}
			setStep((prevStep) => prevStep + 1);
		}
	}

	//Fonction permettant de reculer dans les pages
	const handlePrevStep = () => {
		setStep((prevStep) => prevStep - 1);
	}

	const calendarRef = useRef<HTMLDivElement>(null);

	//Gérer le clic en dehors du calendrier
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if(calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
				setBirthDateDisplay(false)
			}
		}

		if (birthDateDisplay) {
			document.addEventListener("mousedown", handleClickOutside)
		} else {
			document.removeEventListener("mousedown",handleClickOutside)
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside)
		}
	}, [birthDateDisplay])

	const handleClick = () => {
		setBirthDateDisplay((prev) => !prev)
	}

	const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

	//Fonction générique pour setter les changements dans les TextInput
	const handleChange = (setter: React.Dispatch<React.SetStateAction<string>>) => 
		(e: ChangeEvent<HTMLInputElement>) => setter(e.target.value);

	const handleDateChange = (value: Value) => {
		if (value instanceof Date) {
			setBirthDate(value);
			setBirthDateDisplay(false);
		}
	};	  

	const checkPassword = (password: string) => {
		//console.log("checking password...");
		if (password.length <= 8) {
			setErrorSpecialCharPassword(true);
			//console.log("password too short");
			return;
		}
		setErrorSpecialCharPassword(!specialCharRegex.test(password));
	};

	const checkPasswordVerify = (password: string, passwordVerify: string) => {
		setErrorMatchingPassword(password != passwordVerify);
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		
			setErrorEmptyLogin(!login);
			setErrorEmptyPassword(!password);
			setErrorEmptyPasswordVerify(!passwordVerify);
			setErrorEmptyFirstname(!firstname);
			setErrorEmptyLastname(!lastname);
			setEmptyErrorEmail(!email);
			setErrorEmptyPostalCode(!postalCode);
			//setErrorEmptyBirthDate(!birthDate);

			checkPassword(password);
			checkPasswordVerify(password, passwordVerify);

			console.log("submit???")
			
			setErrorEmptyGardenerLevel(!gardenerLevel);
			setErrorEmptyInterests(!interests.length);

			if (!gardenerLevel || !interests.length) {
				return //Empêche la soumission si erreur
			} else {
				console.log("FORM OK");
			};
	};

//#endregion

return (
    <Card className={"max-w-screen h-full px-8 pt-5"}>
				<h1 className="text-4xl mb-5">{translations.signup}: </h1>

				<form onSubmit={handleSubmit} className="flex flex-col">
					{step === 1 && (
						<>
						<TextInput
							type="text"
							label={translations.username}
							value={login}
							name="login"
							placeholder={translations.enterusername}
							error={errorEmptyLogin}
							onChange={handleChange(setLogin)}
						/>

						<div className="relative">
							<TextInput
								type={showPassword ? "text" : "password"}
								label={translations.password}
								value={password}
								name="password"
								placeholder={translations.enterpassword}
								error={errorEmptyPassword}
								errorPassChar={errorSpecialCharPassword}
								onChange={handleChange(setPassword)}
							/>

							<button
								type="button"
								onClick={togglePasswordVisibility}
								 className="absolute right-2 top-8.5 text-gray-500"
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
								 type={showPasswordVerify ? "text" : "password"}
								label={translations.pwdverif}
								value={passwordVerify}
								name="passwordVerify"
								placeholder={translations.enterpasswordagain}
								error={errorEmptyPasswordVerify}
								errorPassMatch={errorMatchingPassword}
								onChange={handleChange(setPasswordVerify)}
							/>

							<button
								type="button"
								onClick={togglePasswordVerifyVisibility}
								className="absolute right-2 top-8.5 text-gray-500"
							>
								{showPasswordVerify ? (
									<i className="fa fa-eye-slash"></i> // Icône "œil barré"
								) : (
									<i className="fa fa-eye"></i> // Icône "œil"
								)}
							</button>
						</div>
						
						<p onClick={handleClick}>{translations.birthdate} </p>
						<p onClick={handleClick} className="bg-bginput pl-3 mb-5">{birthDate.toDateString()}</p>

						{birthDateDisplay && (
							<div ref={calendarRef}>
								<Calendar onChange={handleDateChange} value={birthDate} />
							</div>
						)}

						<TextInput
							type="text"
							label={translations.firstname}
							value={firstname}
							name="firstname"
							placeholder={translations.enterfirstname}
							error={errorEmptyFirstname}
							onChange={handleChange(setFirstname)}
						/>

						<TextInput
							type="text"
							label={translations.lastname}
							value={lastname}
							name="lastname"
							placeholder={translations.enterlastname}
							error={errorEmptyLastname}
							onChange={handleChange(setLastname)}
						/>

						<p>{translations.gender} </p>
						<div className="flex items-center gap-4">
							<Radio id="M" name="gender" value="M" checked={gender === "M"} onChange={() => setGender("M")}/>
							<Radio id="F" name="gender" value="F" checked={gender === "F"} onChange={() => setGender("F")}/>
							<Radio id="X" name="gender" value="X" checked={gender === "X"} onChange={() => setGender("X")}/>
						</div>
											
						<TextInput
							type="email"
							label={translations.email}
							value={email}
							name="email"
							placeholder={translations.enteremail}
							error={errorEmptyEmail}
							onChange={handleChange(setEmail)}
						/>

						<DropDownPostalCode
							label={translations.postalcode}
							value={postalCode}
							onChange={handleChange(setPostalCode)}
							error={errorEmptyPostalCode}
							setIsValidPostalCode={setIsValidPostalCode}
						/>
					</>
					)}

					{step === 2 && (
					<>
			            {/* Vos intérêts */}	
						<HashtagInput 
							label={translations.yourinterests}
							name="interests"
							placeHolder={translations.addahashtag}
							onHashtagsChange={handleInterestsHashtagsChange}
							error={errorEmptyInterests}
						/>

						{/* Affichage des hashtags pour vérifier 
						<p>Hashtags sélectionnés : {interests.join(", ")}</p>
						*/}
						
						{/* Niveau du jardinier */}
						<DropDown
							label={translations.yourlevel}
							placeholder={translations.enteryourlevel}
							options={gardenerLevels}
							selectedValue={gardenerLevel}
							setSelectedValue={setGardenerLevel}
							error={errorEmptyGardenerLevel}
						/>

						{/* Newsletter & Condition Générale d'Utilisation */}
						<div className="flex items-start mb-2">
							<Checkbox checked={isChecked} onChange={setIsChecked} />
							<p className="ml-2">{translations.newsletter}</p>
						</div>
						<div>
							<p>{translations.agree}
								<Link href="/cgu" legacyBehavior className="text-blue-500 underline">
									<a target="_blank" className="text-blue-500 underline">{translations.cgu}</a>
								</Link>
							</p>
						</div>
					</>
					)}

					<div className="flex justify-center pb-5">
						{step === 2 && (
							<Button type="action" handleAction={handlePrevStep}>
								{translations.previous}
							</Button>
						)}

						{step === 1 ? (
							<Button type="action" handleAction={handleNextStep}>
								{translations.next}
							</Button>
						) : (
							<Button type="submit" handleSubmit={(e) => handleSubmit(e as unknown as FormEvent<HTMLFormElement>)}>
								{translations.sign}
							</Button>
						)}
						{/* <Button type="submit" handleSubmit={(e) => handleSubmit(e as unknown as FormEvent<HTMLFormElement>)}>
							{translations.sign}
						</Button> */}
					</div>

				</form>
			</Card>
)
}

export default RegisterForm