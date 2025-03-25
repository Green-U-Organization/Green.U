/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React from "react";
import { useState, useRef, useEffect, ChangeEvent, FormEvent} from "react";
import Card from "@/components/Card";
import TextInput from "@/components/TextInput";
import Button from "@/components/Button";
import Calendar from "react-calendar";
import { CalendarProps } from "react-calendar";
type Value = CalendarProps["value"];
import Radio from "@/components/Radio";
import DropDown from "@/components/DropDownPostalCode";
import postalCodes from "@/data/postalCodesBE.json";
import { useLanguage } from '@/app/contexts/LanguageProvider';
import Checkbox from "@/components/Checkbox";
import HashtagInput from "@/components/HashtagInput";

const page = () => {
	const [login, setLogin] = useState("");
	const [errorEmptyLogin, setErrorEmptyLogin] = useState<boolean>(false);
	const [password, setPassword] = useState("");
	const [errorEmptyPassword, setErrorEmptyPassword] = useState<boolean>(false);
	const [passwordVerify, setPasswordVerify] = useState("");
	const [errorEmptyPasswordVerify, setErrorEmptyPasswordVerify] = useState<boolean>(false);
	const [firstname, setFirstname] = useState("");
	const [errorEmptyFirstname, setErrorEmptyFirstname] = useState<boolean>(false);
	const [lastname, setLastname] = useState("");
	const [errorEmptyLastname, setErrorEmptyLastname] =	useState<boolean>(false);
	const [email, setEmail] = useState("");
	const [errorEmptyEmail, setEmptyErrorEmail] = useState<boolean>(false);
	const [postalCode, setPostalCode] = useState("");
	const [gender, setGender] = useState("M"); // ajouter bouton radio pour définir sexe
	const [errorEmptyPostalCode, setErrorEmptyPostalCode] =	useState<boolean>(false);
	const [birthDate, setBirthDate] = useState(new Date());
	const [errorEmptyBirthDate, setErrorEmptyBirthDate] = useState<boolean>(false);
	const [errorSpecialCharPassword, setErrorSpecialCharPassword] = useState<boolean>(false);
	const [errorMatchingPassword, setErrorMatchingPassword] = useState<boolean>(false);
  	const [birthDateDisplay, setBirthDateDisplay] = useState<boolean>(false)
	const {translations} = useLanguage();
	const [step, setStep] = useState(1); //Pour gérer l'affichage des "pages"

        //Pour gérer la liste des hashtags
        const [hashtags, setHashtags] = useState<string[]>([]);

	//Fonction de vérification de la validité des champs obligatoires avant de pouvoir changer de page
	const validateStep = () => {
		if (step === 1) {
			const isValid = login && password && passwordVerify && firstname && lastname && email && postalCode && birthDate;
			setErrorEmptyLogin(!login);
			setErrorEmptyPassword(!password);
			setErrorEmptyPasswordVerify(!passwordVerify);
			setErrorEmptyFirstname(!firstname);
			setErrorEmptyLastname(!lastname);
			setEmptyErrorEmail(!email);
			setErrorEmptyPostalCode(!postalCode);
			setErrorEmptyBirthDate(!birthDate);
			
			return true; //
		} else if (step === 2) {
			//A ADAPTER SI VALIDATIONS A LA PAGE 2
			const isValid = true;
			return isValid;
		}
		return true; 
	};

	//Fonction permettant d'avancer dans les pages
	const nextStep = () => {
		if (validateStep()) {
			setStep((prevStep) => prevStep + 1);
		}
	}

	//Fonction permettant de reculer dans les pages
	const prevStep = () => {
		if (validateStep()) {
			setStep((prevStep) => prevStep - 1);
		}
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

	const specialChar = [
		"²",
		"&",
		"~",
		"'",
		"#",
		"{",
		"(",
		"[",
		"-",
		"|",
		"`",
		"_",
		"^",
		"@",
		")",
		"]",
		"=",
		"}",
		"+",
		"°",
		"^",
		"¨",
		"¤",
		"$",
		"£",
		"%",
		"!",
		"§",
		":",
		"/",
		";",
		".",
		"?",
	];

	const handleLoginChange = (e: ChangeEvent<HTMLInputElement>) => {
		setLogin(e.target.value);
	};
	const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};
	const handlePasswordVerifyChange = (e: ChangeEvent<HTMLInputElement>) => {
		setPasswordVerify(e.target.value);
	};
	const handleFirstnameChange = (e: ChangeEvent<HTMLInputElement>) => {
		setFirstname(e.target.value);
	};
	const handleLastnameChange = (e: ChangeEvent<HTMLInputElement>) => {
		setLastname(e.target.value);
	};
	const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};
	const handlePostalCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPostalCode(e.target.value);
	};
	const handleDateChange = (value: Value) => {
		if (value instanceof Date) {
			setBirthDate(value);
			setBirthDateDisplay(false);
		}
	};	  

	const checkPassword = (password: string) => {
		console.log("checking password...");
		if (password.length <= 8) {
			setErrorSpecialCharPassword(true);
			console.log("password too short");
			return;
		}
		const hasSpecialChar = specialChar.some((char) =>
			password.includes(char)
		);
		setErrorSpecialCharPassword(!hasSpecialChar);
	};

	const checkPasswordVerify = (password: string, passwordVerify: string) => {
		setErrorMatchingPassword(password != passwordVerify);
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!login) {
			setErrorEmptyLogin(true);
		} else {
			setErrorEmptyLogin(false);
		}
		if (!password) {
			setErrorEmptyPassword(true);
		} else {
			setErrorEmptyPassword(false);
		}
		if (!passwordVerify) {
			setErrorEmptyPasswordVerify(true);
		} else {
			setErrorEmptyPasswordVerify(false);
		}
		if (!firstname) {
			setErrorEmptyFirstname(true);
		} else {
			setErrorEmptyFirstname(false);
		}
		if (!lastname) {
			setErrorEmptyLastname(true);
		} else {
			setErrorEmptyLastname(false);
		}
		if (!email) {
			setEmptyErrorEmail(true);
		} else {
			setEmptyErrorEmail(false);
		}
		if (!postalCode) {
			setErrorEmptyPostalCode(true);
		} else {
			setErrorEmptyPostalCode(false);
		}
		if (!birthDate) {
			setErrorEmptyBirthDate(true);
		} else {
			setErrorEmptyBirthDate(false);
		}

		checkPassword(password);
		checkPasswordVerify(password, passwordVerify);

		if (
			!errorEmptyLogin &&
			!errorEmptyPassword &&
			!errorEmptyPasswordVerify &&
			!errorEmptyFirstname &&
			!errorEmptyLastname &&
			!errorEmptyEmail &&
			!errorEmptyPostalCode &&
			!errorEmptyBirthDate &&
			!errorSpecialCharPassword &&
			!errorMatchingPassword  
		) {
			console.log("everything is ok");
		}
	};

	return (
		<section className="flex items-center justify-center h-full">
			<Card className={"max-w-lg h-full px-8 pt-5"}>
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
							onChange={handleLoginChange}
						/>

						<TextInput
							type="password"
							label={translations.password}
							value={password}
							name="password"
							placeholder={translations.enterpassword}
							error={errorEmptyPassword}
							errorPassChar={errorSpecialCharPassword}
							onChange={handlePasswordChange}
						/>

						<TextInput
							type="password"
							label={translations.pwdverif}
							value={passwordVerify}
							name="passwordVerify"
							placeholder={translations.enterpasswordagain}
							error={errorEmptyPasswordVerify}
							errorPassMatch={errorMatchingPassword}
							onChange={handlePasswordVerifyChange}
						/>

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
							onChange={handleFirstnameChange}
						/>

						<TextInput
							type="text"
							label={translations.lastname}
							value={lastname}
							name="lastname"
							placeholder={translations.enterlastname}
							error={errorEmptyLastname}
							onChange={handleLastnameChange}
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
							onChange={handleEmailChange}
						/>

						<DropDown
							label={translations.postalcode}
							value={postalCode}
							onChange={handlePostalCodeChange}
							error={errorEmptyPostalCode}
						/>
					</>
					)}

					{step === 2 && (
						<>
			            {/* Vos intérêts */}
							<div>
								<HashtagInput 
									label={translations.yourinterests}
									name={""}
									placeHolder={translations.addahashtag}
									error={false}
								/>
							</div>

							
						</>
					)}

					<div className="flex justify-center pb-5">
					{step > 1 && (
						<Button type="action" handleAction={prevStep}>
							{translations.previous}
						</Button>
					)}

					{step < 2 ? (
						<Button type="action" handleAction={nextStep}>
							{translations.next}
						</Button>
					) : (
						<Button type="submit" handleSubmit={handleSubmit}>
							{translations.sign}
						</Button>
					)}
				</div>


				</form>
			</Card>
		</section>
	);
};

export default page;
