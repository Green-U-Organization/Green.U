type LogType = {
  plantNurseryId: number;
  action: string;
  comment: string;
  status: string;
  auto: boolean;
};

export const addPlantNurseryLog = async (log: LogType): Promise<LogType> => {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API + '/log/plantNursery',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(log),
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to add plant nursery log: ${response.statusText}`
      );
    }

    return response.json();
  } catch (error) {
    console.error('Error in addPlantNurseryLog: ', error);
    throw error;
  }
};
