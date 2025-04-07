type lineType = {
  parcelId: number;
};

export const deleteOneLineByLineId = async (line: lineType) => {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API + '/garden/parcel/line',
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(line),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to delete line:  ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error in deleteoneLineByLineId: ', error);
    throw error;
  }
};
