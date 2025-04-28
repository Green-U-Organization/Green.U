type LogType = {
  action?: string;
  comment?: string;
  status?: string;
  auto?: boolean;
};

export const editPlantNurseryLog = async (
  log: LogType,
  plantNurseryId: number
): Promise<LogType> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLI_API}/log/plantNursery/${plantNurseryId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(log),
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to update plant nursery log: ${response.statusText}`
      );
    }

    return response.json();
  } catch (error) {
    console.error('Error in editPlantNurseryLog:', error);
    throw error;
  }
};
