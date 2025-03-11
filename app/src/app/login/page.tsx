"use client"

import React from "react";
// import "@radix-ui/themes/styles.css";
// import { Card, Button, TextField, Flex } from "@radix-ui/themes";

const page = () => {

	const handleSubmit = () => {
		console.log("first")
	}

	return (
		<>
		<div className="h-full flex flex-col justify-center">

<section className="flex flex-col border-10 border-[#a85426] rounded-4xl justify-center items-center bg-[#edb67b] mt-30 py-10">

	<form onSubmit={handleSubmit} className="flex flex-col justify-center items-center mb-20">

	<h1>Green.U</h1>
	<input type="text" name="userName" placeholder="userName" className="m-3 rounded-md px-2 bg-[#edd296] border-[#a85426] border-5"/>
	<input type="password" name="password" placeholder="password" className="m-3 rounded-md px-2 bg-[#edd296] border-[#a85426] border-5"/>
	<button type="submit" className="px-2 rounded-md bg-[#edd296] border-[#a85426] border-5">Log in</button>
	</form>

	<article  className="flex flex-col justify-center items-center">
	<p className="m-3">Don&apos;t have any account yet?</p>
	<button href="" className="px-2 rounded-md bg-[#edd296] border-[#a85426] border-5">Sign in</button>
	</article>

</section>
		</div>
		</>
	);
};

export default page;
