import React from "react";
import "@radix-ui/themes/styles.css";
import { Card, Button, TextField, Flex } from "@radix-ui/themes";

const page = () => {
	return (
		<>
		
			<Card>
				<form>
					<Flex direction="column" gap="3" >
						<TextField.Root
							radius="full"
							variant="soft"
							placeholder="UserName"
						/>
						<TextField.Root
							radius="full"
							variant="soft"
							placeholder="Email"
						/>
						<TextField.Root
							radius="full"
							variant="soft"
							placeholder="UserName"
						/>
						<Button>Yo</Button> <br />
					</Flex>
				</form>
			</Card>
		</>
	);
};

export default page;
