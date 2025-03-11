import React from "react";
import "@radix-ui/themes/styles.css";
import { Button } from "@radix-ui/themes";

const page = () => {
	return (
		<>
			{/* <Form.Root>
				<Form.Field name="username">
					<div>
						<Form.Label>UserName</Form.Label>
						<Form.Message
							className="FormMessage"
							match="valueMissing"
						>
							Please enter your username
						</Form.Message>
						<Form.Control asChild>
							<input type="text" required />
						</Form.Control>
					</div>
				</Form.Field>
			</Form.Root> */}
            <Button>Yo</Button>
		</>
	);
};

export default page;
