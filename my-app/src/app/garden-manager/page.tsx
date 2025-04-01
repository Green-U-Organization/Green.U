import GardenDisplay from "@/components/GardenDisplay";
import { getAllGardenByUserId } from "@/utils/actions/garden/getAllGardenByUserId";
import React from "react";

const userId = 11

getAllGardenByUserId(userId)

const Page = () => {

	return (
		<GardenDisplay></GardenDisplay>
	)
};

export default Page;
