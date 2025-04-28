type LogType = {
  action?: string;
  comment?: string;
  status?: string;
  auto?: boolean;
};

export const editGardenLog = async (
  log: LogType,
  gardenId: number
): Promise<LogType> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLI_API}/log/garden/${gardenId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(log),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to update garden log: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error in editGardenLog:', error);
    throw error;
  }
};
