/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import React, { ChangeEvent, FormEvent } from "react";
import { useState } from "react";
import Card from "@/components/Card";
import TextInput from "@/components/TextInput";
import Button from "@/components/Button";

const page = () => {
	const [login, setLogin] = useState("");
	const [errorEmptyLogin, setErrorEmptyLogin] = useState<boolean>(false);
	const [password, setPassword] = useState("");
	const [errorEmptyPassword, setErrorEmptyPassword] =
		useState<boolean>(false);
	const [passwordVerify, setPasswordVerify] = useState("");
	const [errorEmptyPasswordVerify, setErrorEmptyPasswordVerify] =
		useState<boolean>(false);
	const [surname, setSurname] = useState("");
	const [errorEmptySurname, setErrorEmptySurname] = useState<boolean>(false);
	const [lastname, setLastname] = useState("");
	const [errorEmptyLastname, setErrorEmptyLastname] =
		useState<boolean>(false);
	const [email, setEmail] = useState("");
	const [errorEmptyEmail, setEmptyErrorEmail] = useState<boolean>(false);
	const [postalCode, setPostalCode] = useState("");
	const [errorEmptyPostalCode, setErrorEmptyPostalCode] =
		useState<boolean>(false);
	const [sexe, setSexe] = useState("");
	const [birthDate, setBirthDate] = useState("");
	const [errorEmptyBirthDate, setErrorEmptyBirthDate] =
		useState<boolean>(false);
	const [errorSpecialCharPassword, setErrorSpecialCharPassword] =
		useState<boolean>(false);
	const [errorMatchingPassword, setErrorMatchingPassword] =
		useState<boolean>(false);

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
	const handleSurnameChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSurname(e.target.value);
	};
	const handleLastnameChange = (e: ChangeEvent<HTMLInputElement>) => {
		setLastname(e.target.value);
	};
	const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};
	const handlePostalCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
		setPostalCode(e.target.value);
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
		if (!surname) {
			setErrorEmptySurname(true);
		} else {
			setErrorEmptySurname(false);
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
			!errorEmptySurname &&
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
			<Card style={"max-w-5xl h-full "}>
				<h1 className="text-4xl mb-10">Sign in : </h1>

				<form onSubmit={handleSubmit} className="flex flex-col">
					<TextInput
						type="text"
						label="Username"
						value={login}
						name="login"
						placeholder="Enter your user name"
						error={errorEmptyLogin}
						onChange={handleLoginChange}
					/>

					<TextInput
						type="password"
						label="Password"
						value={password}
						name="password"
						placeholder="Enter your password"
						error={errorEmptyPassword}
            errorPassChar={errorSpecialCharPassword}
						onChange={handlePasswordChange}
					/>

					<TextInput
						type="password"
						label="Password verification"
						value={passwordVerify}
						name="passwordVerify"
						placeholder="Enter your password again"
						error={errorEmptyPasswordVerify}
            errorPassMatch={errorMatchingPassword}
						onChange={handlePasswordVerifyChange}
					/>

					<TextInput
						type="text"
						label="Surname"
						value={surname}
						name="surname"
						placeholder="Enter your surname"
						error={errorEmptySurname}
						onChange={handleSurnameChange}
					/>

					{/* Add radio button for sexe and calendar for birthdate */}

					<TextInput
						type="text"
						label="Lastname"
						value={lastname}
						name="lastname"
						placeholder="Enter your lastname"
						error={errorEmptyLastname}
						onChange={handleLastnameChange}
					/>

					<TextInput
						type="email"
						label="Email"
						value={email}
						name="email"
						placeholder="Enter your email"
						error={errorEmptyEmail}
						onChange={handleEmailChange}
					/>

					<TextInput
						type="number"
						label="Postal code"
						value={postalCode}
						name="postalCode"
						placeholder="Enter your postal code"
						error={errorEmptyPostalCode}
						onChange={handlePostalCodeChange}
					/>

					<Button type="submit" handleSubmit={handleSubmit}>
						Sign
					</Button>
				</form>
			</Card>
		</section>
	);
};

export default page;
