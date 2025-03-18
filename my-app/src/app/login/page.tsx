/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import React, { ChangeEvent, FormEvent, useEffect } from "react";
import { useState } from "react";
import Card from "@/components/Card";
import TextInput from "../../components/TextInput";
import Button from "@/components/Button";

const page = () => {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [errorEmail, setErrorEmail] = useState<boolean>(false);
    const [errorPassword, setErrorPassword] = useState<boolean>(false);
	// const [checkPass, setCheckPass] = useState<Boolean>(false);

	// const specialChar = [
	// 	"²",
	// 	"&",
	// 	"~",
	// 	"'",
	// 	"#",
	// 	"{",
	// 	"(",
	// 	"[",
	// 	"-",
	// 	"|",
	// 	"`",
	// 	"_",
	// 	"^",
	// 	"@",
	// 	")",
	// 	"]",
	// 	"=",
	// 	"}",
	// 	"+",
	// 	"°",
	// 	"^",
	// 	"¨",
	// 	"¤",
	// 	"$",
	// 	"£",
	// 	"%",
	// 	"!",
	// 	"§",
	// 	":",
	// 	"/",
	// 	";",
	// 	".",
	// 	"?",
	// ];

	// const checkPassword = (password: string) => {
	// 	console.log("checking password...");
	// 	if (password.length <= 8) {
	// 		setCheckPass(false);
	// 		console.log("password too short");
	// 		return;
	// 	}
	// 	const hasSpecialChar = specialChar.some((char) =>
	// 		password.includes(char)
	// 	);
	// 	setCheckPass(hasSpecialChar);
	// };

	const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
		const newPassword = e.target.value;
		setPassword(newPassword);
		// checkPassword(newPassword);
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// checkPassword(password);
		if (!email) {
			setErrorEmail(true)
        }
        if (!password) {
            setErrorPassword(true)
        }
		// } else if (!checkPass) {
		// 	setError(true)
		// } 
        else {
			setErrorEmail(false);
            setErrorPassword(false)

			// ça fonctionne. Prévoir la route pour log in!
			console.log(email);
			console.log(password);
		}
	};

	return (
		<section className="flex items-center justify-center h-screen">
			<Card style={"max-w-5xl h-full"}>
				<form onSubmit={handleSubmit}>
					<div className="flex flex-col items-center justify-center">
						<h2 className="text-7xl mb-10">*Green-U*</h2>

						<div className="flex flex-col justify-center items-left">
							<TextInput
								type="email"
								label="Email"
								value={email}
								name="email"
								placeholder="Enter your email"
								onChange={handleEmailChange}
								error={errorEmail}
							/>
							<br />
							<TextInput
								type="password"
								label="Password"
								value={password}
								name="password"
								placeholder="Enter your password"
								onChange={handlePasswordChange}
								error={errorPassword}
							/>
						</div>
						<br />
						<div className="flex flex-row justify-between">
							<Button
								type="submit"
								handleSubmit={handleSubmit}
								href=""
							>
								Log in
							</Button>
							<Button type="link" href="/signin">
								Sign in
							</Button>
						</div>
					</div>
				</form>
			</Card>
		</section>
	);
};

export default page;
