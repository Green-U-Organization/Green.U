type UserType = {
    user_id: number
}

export const getUserById = async (user: UserType): Promise<UserType> => {
    
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_API + "/user", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
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
