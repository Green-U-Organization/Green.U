type UserType = {
    username: string,
    password: string,
    isAdmin: boolean,
    firstname: string,
    lastname: string,
    email: string,
    postalCode: string,
    gender: string,
    birthday: string,
    bio?: string,
    profileImage?: string,
    country: string
}

export const addUser = async (user: UserType): Promise<UserType> => {
    
    try {
        const response = 
        await fetch(process.env.NEXT_PUBLIC_API + "/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });

        if (!response.ok) {
            throw new Error(`Failed to add user: ${response.statusText}`);
        }

        return response.json();

    } catch (error) {
        console.error("Error in addUser: ", error);
        throw error;
    }

};