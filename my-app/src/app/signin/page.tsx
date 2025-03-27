
import React from "react";
import RegisterForm from "@/components/RegisterForm";
import NewUserButton from "@/components/newUserButton";

const page = () => {
//#region 	FETCH FUNCTION


//#endregion

// 			DISPLAY
	return (
		<section className="flex items-center justify-center h-full">
<NewUserButton></NewUserButton>
			<RegisterForm></RegisterForm>
		</section>
	);
};

export default page;
