type UserType = {
    user_id: number,
    username?: string,
    password?: string,
    is_admin?: boolean,
    firstname?: string,
    lastname?: string,
    email?: string,
    postal_code?: string,
    gender?: string,
    birthday?: string,
    bio?: string,
    profile_image?: string,
    level?: number,
    xp?: number
}

export const editUser = async (user: UserType): Promise<UserType>  => {

    try {
        const response =
        await fetch(`${process.env.NEXT_PUBLIC_API}/user`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });

        if (!response.ok) {
            throw new Error(`Failed to update user: ${response.statusText}`);
        }

        return response.json();
  
    } catch (error) {
        console.error("Error in updateUser:", error);
        throw error;
    }
};