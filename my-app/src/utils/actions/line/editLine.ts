
type lineType = {
    lineId: number,
    parcelId: number,
    lineLength: number,
};

export const editLine = async (
    lineId: number,
    parcelId: number,
    lineLength: number,
): Promise<lineType> => {

    const bodyRequest = {
        line_id: lineId,
        parcel_id: parcelId,
        length: lineLength
    };

    const response =
        await fetch(process.env.NEXT_PUBLIC_API + "/garden/parcel/line", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bodyRequest)
        });

    if (!response.ok) {
        throw new Error("Failed to edit the line");
    }

    const editLine: lineType = await response.json();
    return editLine;
};