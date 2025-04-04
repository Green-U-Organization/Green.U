type LogType = {
    lineId: number,
    action: string,
    comment: string,
    status: string,
    auto: boolean
}

export const addLineLog = async (log: LogType): Promise<LogType> => {
    
    try {
        const response = await fetch(`${process.env.NEXT_PUBLI_API}/log/line`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(log)
        });

        if (!response.ok) {
            throw new Error(`Failed to add line log: ${response.statusText}`);
        }

        return response.json();

    } catch (error) {
        console.error("Error in addLineLog: ", error);
        throw error;
    }

};