
type lineType = {
    parcelId: number,
    lineLength: number,
};

export const createNewLine = async (
    parcelId: number,
    lineLength: number,
): Promise<lineType> => {

    const bodyRequest = {
        parcel_id: parcelId,
        length: lineLength
    };

    const response =
        await fetch(process.env.NEXT_PUBLIC_API + "/garden/parcel/line", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bodyRequest)
        });

    if (!response.ok) {
        throw new Error("Failed to create a new line");
    }

    const newLine: lineType = await response.json();
    return newLine;
};