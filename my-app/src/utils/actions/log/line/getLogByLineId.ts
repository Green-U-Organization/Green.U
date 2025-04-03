export const getLogByLineId = async (lineId: number) => {

    try {
        const response = await fetch(`${process.env.NEXT_PUBLI_API}/log/line/${lineId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to get line log data: ${response.statusText}`);
        }

        return response.json();
    
    } catch (error) {
        console.error("Error in getLogByLineId: ", error);
        throw error;
    }
}

