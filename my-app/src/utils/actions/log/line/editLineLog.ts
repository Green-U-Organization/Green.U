type LogType = {
    action?: string,
    comment?: string,
    status?: string,
    auto?: boolean
}

export const editLineLog = async (log: LogType, lineId: number): Promise<LogType>  => {

    try {
        const response = await fetch(`${process.env.NEXT_PUBLI_API}/log/line/${lineId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(log)
        });

        if (!response.ok) {
            throw new Error(`Failed to update line log: ${response.statusText}`);
        }

        return response.json();
  
    } catch (error) {
        console.error("Error in editLineLog:", error);
        throw error;
    }
};