export const getLogByParcelId = async (parcelId: number) => {

    try {
        const response = await fetch(`${process.env.NEXT_PUBLI_API}/log/parcel/${parcelId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to get parcel log data: ${response.statusText}`);
        }

        return response.json();
    
    } catch (error) {
        console.error("Error in getLogByParcelId: ", error);
        throw error;
    }
}

