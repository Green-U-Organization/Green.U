type LogType = {
    author_id?: number,
    garden_id?: number,
    parcel_id?: number,
    line_id?: number,
    crop_id?: number,
    plant_nursery_id?: number
}

export const getLog = async (log: LogType): Promise<LogType> => {

    try {
        const response = await fetch(process.env.NEXT_PUBLI_API + "/log", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(log)
        });

        if (!response.ok) {
            throw new Error(`Failed to get log data: ${response.statusText}`);
        }

        return response.json();
    
    } catch (error) {
        console.error("Error in getLog: ", error);
        throw error;
    }
}

