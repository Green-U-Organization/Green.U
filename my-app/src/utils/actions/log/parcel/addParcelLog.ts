type LogType = {
    parcelId: number,
    action: string,
    comment: string,
    status: string,
    auto: boolean
}

export const addParcelLog = async (log: LogType): Promise<LogType> => {
    
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_API + "/log/parcel", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(log)
        });

        if (!response.ok) {
            throw new Error(`Failed to add parcel log: ${response.statusText}`);
        }

        return response.json();

    } catch (error) {
        console.error("Error in addParcelLog: ", error);
        throw error;
    }

};