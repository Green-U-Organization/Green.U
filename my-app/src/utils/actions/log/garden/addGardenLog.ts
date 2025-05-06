type LogType = {
  gardenId: number;
  action: string;
  comment: string;
  status: string;
  auto: boolean;
};

export const addGardenLog = async (log: LogType): Promise<LogType> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLI_API}/log/garden`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(log),
    });

    if (!response.ok) {
      throw new Error(`Failed to add garden log: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error in addGardenLog: ', error);
    throw error;
  }
};
