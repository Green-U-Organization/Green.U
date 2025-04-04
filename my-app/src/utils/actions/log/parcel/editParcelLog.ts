type LogType = {
    action?: string,
    comment?: string,
    status?: string,
    auto?: boolean
}

export const editParcelLog = async (log: LogType, parcelId: number): Promise<LogType>  => {

    try {
        const response = await fetch(`${process.env.NEXT_PUBLI_API}/log/parcel/${parcelId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(log)
        });

        if (!response.ok) {
            throw new Error(`Failed to update parcel log: ${response.statusText}`);
        }

        return response.json();
  
    } catch (error) {
        console.error("Error in editParcelLog:", error);
        throw error;
    }
};