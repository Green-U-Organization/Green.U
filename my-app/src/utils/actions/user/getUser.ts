export const getUserById = async (userId: number) => {
    
    const bodyRequest = {
        user_id: userId
    };

    try {
        const response = await fetch(process.env.NEXT_PUBLIC_API + "/user", {
            method: "POST", // Utilisation de POST pour envoyer des données dans le body
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bodyRequest)
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
