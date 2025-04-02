type userType = {
    user_id: number
}

export const getAllGardenByUserId = async (user : userType) => {

    try {
        const response =
            await fetch(process.env.NEXT_PUBLIC_API + "/garden/user", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user)
            })

        if (!response.ok) {
            throw new Error(`Failed to get gardens:  ${response.statusText}`);
        }
        return response.json();

    } catch (error) {
        console.error("Error in getAllGardenByUserId: ", error);
        throw error;
    }
}
