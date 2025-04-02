export const deleteUserById = async (userId: number) => {
    
    const bodyRequest = {
        user_id: userId
    };

    try {
        const response = await fetch(process.env.NEXT_PUBLIC_API + "/user", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bodyRequest)
        });

        if (!response.ok) {
            throw new Error(`Failed to delete user: ${response.statusText}`);
        }

        return response.json();

    } catch (error) {
        console.error("Error in deleteUserById: ", error);
        throw error;
    }
};
