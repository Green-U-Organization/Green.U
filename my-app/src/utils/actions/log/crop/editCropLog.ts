type LogType = {
  action?: string;
  comment?: string;
  status?: string;
  auto?: boolean;
};

export const editCropLog = async (
  log: LogType,
  cropId: number
): Promise<LogType> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLI_API}/log/crop/${cropId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(log),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to update crop log: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error in editCropLog:', error);
    throw error;
  }
};
