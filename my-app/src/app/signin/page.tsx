import React from "react";
import RegisterForm from "../../components/RegisterForm";

const page = () => {
//#region FETCH FUNCTION

console.log("registerForm : ", RegisterForm);
//#endregion

// DISPLAY
return (
	<section className="flex items-center justify-center h-full">
		<RegisterForm></RegisterForm>
	</section>
	);
};

export default page;