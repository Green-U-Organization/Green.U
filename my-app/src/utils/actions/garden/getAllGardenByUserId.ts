export const getAllGardenByUserId = async (userId : number) => {

    try {
        const response =
            await fetch(`${process.env.NEXT_PUBLIC_API}/garden/${userId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
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
