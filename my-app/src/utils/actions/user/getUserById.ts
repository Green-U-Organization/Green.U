export const getUserById = async (userId: number): Promise<any> => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/user/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to get user data: ${response.statusText}`);
        }

        return response.json();
    } catch (error) {
        console.error("Error in getUserById: ", error);
        throw error;
    }
};
