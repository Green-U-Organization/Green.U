type LogType = {
    author_id?: number,
    garden_id?: number,
    parcel_id?: number,
    line_id?: number,
    crop_id?: number,
    plant_nursery_id?: number,
    action?: string,
    comment?: string,
    status?: string,
    auto?: boolean
}

export const editLog = async (log: LogType): Promise<LogType>  => {

    try {
        const response =
        await fetch(`${process.env.NEXT_PUBLIC_API}/log`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(log)
        });

        if (!response.ok) {
            throw new Error(`Failed to update log: ${response.statusText}`);
        }

        return response.json();
  
    } catch (error) {
        console.error("Error in editLog:", error);
        throw error;
    }
};