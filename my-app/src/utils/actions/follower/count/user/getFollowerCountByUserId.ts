export const getFollowerCountByUserId = async (userId: number) => {
    
    try {
        const response = await fetch(`${process.env.NEXT_PUBLI_API}/follower/count/user/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userId)
        });

        if (!response.ok) {
            throw new Error(`Failed to get follower by user count: ${response.statusText}`);
        }

        return response.json();
      
    } catch (error) {
        console.error("Error in getFollowerCount: ", error);
        throw error;
    }
};