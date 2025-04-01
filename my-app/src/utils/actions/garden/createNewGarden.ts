
type gardenType = {
    userId: number,
    gardenName: string,
    gardenDescription: string,
    gardenLatitude: number,
    gardenLongitude: number,
    gardenWidth: number,
    gardenLength: number,
    gardenType: "individual" | "collective" | "professionnal",
    gardenPrivacy: "private" | "public"
};

export const createNewGarden = async (
    userId: number, 
    gardenName: string, 
    gardenDescription: string, 
    gardenLatitude: number, 
    gardenLongitude: number,
    gardenLength: number,
    gardenWidth: number,
    gardenPrivacy: "private" | "public",
    gardenType: "individual" | "collective" | "professionnal"
): Promise<gardenType> => {

    const bodyRequest = {
        author_id: userId,
        name: gardenName,
        description: gardenDescription,
        latitude: gardenLatitude,
        longitude: gardenLongitude,
        length: gardenLength,
        width: gardenWidth,
        privacy: gardenPrivacy,
        type: gardenType
    };

    const response = 
    await fetch(process.env.NEXT_PUBLIC_API + "/garden", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyRequest)
    });

    if (!response.ok) {
        throw new Error("Failed to create a new garden");
    }

    const newGarden: gardenType = await response.json();
    return newGarden;
};