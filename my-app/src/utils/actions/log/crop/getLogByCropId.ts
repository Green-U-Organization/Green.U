export const getLogByCropId = async (cropId: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLI_API}/log/crop/${cropId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to get crop log data: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error in getLogByCropId: ', error);
    throw error;
  }
};
