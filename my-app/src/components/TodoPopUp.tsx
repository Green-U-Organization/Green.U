import React, { ChangeEvent, useState } from "react";
import Card from "./Card";
import TextInput from "./TextInput";
import Button from "./Button";

const TodoPopUp = () => {
	const [content, setContent] = useState<string>("");

	const handleContentChange = (e: ChangeEvent<HTMLInputElement>) => {
		setContent(e.target.value);
	};

	return (
		<section className="flex items-center justify-center min-h-[calc(100vh-15px)] overflow-auto">
			<Card className={"max-w-5xl px-8 pt-5"}>
				<form>
					<div>
						<TextInput
							type="text"
							label="Todo: "
							value={content}
							name="content"
							placeholder="what is to do?"
							onChange={handleContentChange}
							// error={errorContent}
						></TextInput>
					</div>
                    <Button type={"submit"} >Submit</Button>
				</form>
			</Card>
		</section>
	);
};

export default TodoPopUp;
