"use client";
import React from "react";
import { useState, useRef, useEffect, ChangeEvent, FormEvent } from "react";
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
import { LogIn } from "lucide-react";

type Value = CalendarProps["value"];

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
}

type ErrorForm = {
	errorEmptyLogin: boolean,
	errorEmptyEmail: boolean,
	errorEmptyFirstname: boolean,
	errorEmptyGardenerLevel: boolean,
	errorEmptyInterests: boolean,
	errorEmptyLastname: boolean,
	errorEmptyPassword: boolean,
	errorEmptyPasswordVerify: boolean,
	errorEmptyPostalCode: boolean,
	errorMatchingPassword: boolean,
	errorNotCheckedToU: boolean,
	errorEmptyBirthDate: boolean,
	errorSpecialCharPassword: boolean,
}

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
		translations.levelexpert
	];

	//	https://blog.logrocket.com/using-react-usestate-object/
	const [formData, setFormData] = useState({
		login: "",
		password: "",
		passwordVerify: "",
		firstname: "",
		lastname: "",
		email: "",
		postalCode: "",
		gender: "",
		birthDate: "",
		gardenerLevel: "",
		interests: [],
	})

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
	})

	const [isValidPostalCode, setIsValidPostalCode] = useState(true);
	const [step, setStep] = useState(1); //Pour gérer l'affichage des "pages"	
	const [showPassword, setShowPassword] = useState(false);
	const [showPasswordVerify, setShowPasswordVerify] = useState(false);
	const [birthDateDisplay, setBirthDateDisplay] = useState<boolean>(false)
	const [isChecked, setIsChecked] = useState(false)
	const [isCheckedToU, setIsCheckedToU] = useState(false);


	//#endregion

	//#region	VALIDITY FUCTIONS
	const step1Validation = () => {

		// setFormData(prevFormData => ({...prevFormData , 
		// 	login : formData.login
		// }))

		const hasEmptyFields =
			!formData.login ||
			!formData.password ||
			!formData.passwordVerify ||
			!formData.firstname ||
			!formData.lastname ||
			!formData.email ||
			!formData.postalCode ||
			!formData.birthDate;

			console.log("emptyfields? ",hasEmptyFields)
	
		const passwordValid =
			formData.password.length > 8 &&
			specialCharRegex.test(formData.password);

	//const calendarRef = useRef<HTMLDivElement>(null);

	const passwordsMatch = formData.password === formData.passwordVerify;
	
	const postalCodeValid = isValidPostalCode;
	
	return !hasEmptyFields && passwordValid && passwordsMatch && postalCodeValid;
};
//#endregion

	const step2Validation = () => {
		console.log("check validation step 2")
		const isValid = formData.gardenerLevel && formData.interests.length > 0 && isCheckedToU;

		setErrorForm(prevErrorForm => ({
			...prevErrorForm,
			errorEmptyGardenerLevel: !formData.gardenerLevel,
			errorEmptyInterests: !formData.interests.length,
			errorNotCheckedToU: !isCheckedToU,
		}))

		console.log("validation ok")
		return isValid;
	}

	const checkPassword = (password: string) => {

		if (password.length <= 8) {
			setErrorForm(prevErrorForm => ({ ...prevErrorForm, errorSpecialCharPassword: true }))

			return;
		}
		setErrorForm(prevErrorForm => ({ ...prevErrorForm, errorSpecialCharPassword: (!specialCharRegex.test(password)) }))
	};

	const checkPasswordVerify = (password: string, passwordVerify: string) => {
		setErrorForm(prevErrorForm => ({ ...prevErrorForm, errorMatchingPassword: (password != passwordVerify) }))
	};

	//Réinitialisation des erreurs quand on arrive sur la page 2
	useEffect(() => {
		console.log("##", errorForm.errorEmptyInterests)
		console.log("garden", errorForm.errorEmptyGardenerLevel)

	}, [errorForm.errorEmptyGardenerLevel, errorForm.errorEmptyInterests, errorForm.errorNotCheckedToU, step]);
	//#endregion

	//#region NAVIGATION FUNCTION
	// Fonction permettant d'avancer dans les pages
	const handleNextStep = (e: React.FormEvent) => {
		e.preventDefault();

		if (step === 1) {
			const isValid = step1Validation();
			console.log('Validation step 1 result:', isValid);

			if (!isValid) {
				setErrorForm(prev => ({
					...prev,
					errorEmptyLogin: !formData.login,
					errorEmptyPassword: !formData.password,
					errorEmptyPasswordVerify: !formData.passwordVerify,
					errorEmptyFirstname: !formData.firstname,
					errorEmptyLastname: !formData.lastname,
					errorEmptyEmail: !formData.email,
					errorEmptyPostalCode: !formData.postalCode,
					errorEmptyBirthDate: !formData.birthDate
				}));
				return;
			}
		}

		setStep(prev => prev + 1);
	};

	// Fonction permettant de reculer dans les pages
	const handlePrevStep = () => {
		setStep(prev => prev - 1);
	}
	//#endregion


	// 	setFormData
	// .interests(newHashtags);
	// };


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
			if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
				setBirthDateDisplay(false)
			}
		}
		if (birthDateDisplay) {
			document.addEventListener("mousedown", handleClickOutside)
		} else {
			document.removeEventListener("mousedown", handleClickOutside)
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside)
		}
	}, [birthDateDisplay])
	const handleClick = () => {
		setBirthDateDisplay((prev) => !prev)
	}

	//#endregion

	const handleDateChange = (value: Value) => {
		if (value instanceof Date) {
			setFormData(prevFormData => ({ ...prevFormData, birthDate: value.toString() }))
			setBirthDateDisplay(false);
		}
	};

	const handleChange = (setter: React.Dispatch<React.SetStateAction<string>>) =>
		(e: ChangeEvent<HTMLInputElement>) => setter(e.target.value);

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!formData.gardenerLevel || !formData.interests.length || !isCheckedToU) {
			return 
		} else {
			console.log("FORM OK");
			const bodyRequest = {
				"Username": formData.login,
				"Password": formData.password,
				"Firstname": formData.firstname,
				"Lastname": formData.lastname,
				"Email": formData.email,
				"Postal_code": formData.postalCode,
				"Country": "Belgium",
				"Sexe": formData.gender,
				"Birthdate": formData.birthDate
			}
			fetch(process.env.NEXT_PUBLIC_API + "/Users", {
				method: "GET",
				body: JSON.stringify(bodyRequest)
			})
		};
	};
	//#endregion

	return (
		<Card className={"max-w-screen h-full px-8 pt-5"}>
			<h1 className="text-4xl mb-5">{translations.signup}: </h1>

			<form method="post"
				onSubmit={handleNextStep}
				className="flex flex-col"
				style={{ display: step === 1 ? "block" : "none" }}
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
						type={showPassword ? "text" : "password"}
						label={translations.password}
						name="password"
						placeholder={translations.enterpassword}
						error={errorForm.errorEmptyPassword}
						errorPassChar={errorForm.errorSpecialCharPassword}
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
						name="passwordVerify"
						placeholder={translations.enterpasswordagain}
						error={errorForm.errorEmptyPasswordVerify}
						errorPassMatch={errorForm.errorMatchingPassword}
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
				<p onClick={handleClick} className="bg-bginput pl-3 mb-5">{formData.birthDate.toString()}</p>

				{birthDateDisplay && (
					<div ref={calendarRef}>
						<Calendar
							onChange={handleDateChange}
							value={formData.birthDate ? new Date(formData.birthDate) : new Date()}
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
					<Radio id="M" name="gender" value="M" checked={formData.gender === "M"} onChange={(value) => setFormData(prevFormData => ({ ...prevFormData, gender: value }))} />
					<Radio id="F" name="gender" value="F" checked={formData.gender === "F"} onChange={(value) => setFormData(prevFormData => ({ ...prevFormData, gender: value }))} />
					<Radio id="X" name="gender" value="X" checked={formData.gender === "X"} onChange={(value) => setFormData(prevFormData => ({ ...prevFormData, gender: value }))} />
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
					value={formData.postalCode}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
						setFormData(prev => ({ ...prev, postalCode: e.target.value }));
					}}
					error={errorForm.errorEmptyPostalCode}
					setIsValidPostalCode={setIsValidPostalCode}
				/>
				<Button type="submit">
					{translations.next}
				</Button>
			</form>


			<form
				onSubmit={handleSubmit}
				className="flex flex-col"
				style={{ display: step === 2 ? "block" : "none" }}
			>


				{/* Vos intérêts */}
				{/* <HashtagInput
							label={translations.yourinterests}
							name="interests"
							placeHolder={translations.addahashtag}
							onHashtagsChange={handleInterestsHashtagsChange}
							error={errorForm.errorEmptyInterests}
						/> */}

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
				<div className="flex items-start mb-2">
					<Checkbox checked={isChecked} onChange={setIsChecked} />
					<p className="ml-2">{translations.newsletter}</p>
				</div>
				<div className="flex items-start mb-0">
					<Checkbox checked={isCheckedToU} onChange={setIsCheckedToU} />
					<p className="ml-2">{translations.agree}
						<Link href="/cgu" legacyBehavior className="text-blue-500 underline">
							<a target="_blank" className="text-blue-500 underline">{translations.cgu}</a>
						</Link>
					</p>
				</div>
				{errorForm.errorNotCheckedToU && <p className="text-txterror">{translations.errorNotCheckedToU}</p>}
				<div className="flex justify-center pb-5">

					<Button type="action" handleAction={handlePrevStep}>
						{translations.previous}
					</Button>

					<Button type="submit" handleSubmit={(e) => handleSubmit(e as unknown as FormEvent<HTMLFormElement>)}>
						{translations.sign}
					</Button>

				</div>
			</form>
		</Card >
	)
}

export default RegisterForm