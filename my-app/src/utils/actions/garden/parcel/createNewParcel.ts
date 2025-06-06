type parcelType = {
  gardenId: number;
  length: number;
  width: number;
  x_position: number;
  y_position: number;
  parcel_angle: number;
};

export const createNewParcel = async (
  parcel: parcelType
): Promise<parcelType> => {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API + '/garden/parcel',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parcel),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to create a new pacel:  ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error in createNewParcel: ', error);
    throw error;
  }
};
