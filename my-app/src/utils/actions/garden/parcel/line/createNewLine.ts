type lineType = {
  parcelId: number;
  length: number;
};

export const createNewLine = async (line: lineType): Promise<lineType> => {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API + '/garden/parcel/line',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(line),
      }
    );
    if (!response.ok) {
      throw new Error(`Failed to create new line:  ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error in createNewLine: ', error);
    throw error;
  }
};
