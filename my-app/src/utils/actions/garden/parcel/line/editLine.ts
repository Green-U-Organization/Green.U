type lineType = {
    lineId: number,
    parcelId: number,
    length: number
};

export const editLine = async (
    line: lineType
): Promise<lineType> => {

    try {
        const response =
            await fetch(process.env.NEXT_PUBLIC_API + "/garden/parcel/line", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(line)
            });

        if (!response.ok) {
            throw new Error(`Failed to edit line:  ${response.statusText}`);
        }
        return response.json();

    } catch (error) {
        console.error("Error in editLine: ", error);
        throw error;
    }
}