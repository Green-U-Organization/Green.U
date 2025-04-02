type vegetableType = {
    vegetable : string
}

export const getCropByVegetableNAame = async (vegetable : vegetableType) => {

    try {
        const response =
            await fetch(process.env.NEXT_PUBLIC_API + "/crops", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(vegetable)
            })

        if (!response.ok) {
            throw new Error(`Failed to get crops:  ${response.statusText}`);
        }
        return response.json();

    } catch (error) {
        console.error("Error in getCropByVegetableName: ", error);
        throw error;
    }
}