export const getLogByPlantNurseryId = async (plantNurseryId: number) => {

    try {
        const response = await fetch(`${process.env.NEXT_PUBLI_API}/log/plantNursery/${plantNurseryId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to get plant nursery log data: ${response.statusText}`);
        }

        return response.json();
    
    } catch (error) {
        console.error("Error in getLogByPlantNurseryId: ", error);
        throw error;
    }
}

