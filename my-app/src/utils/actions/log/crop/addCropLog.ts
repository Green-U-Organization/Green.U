type LogType = {
  cropId: number;
  action: string;
  comment: string;
  status: string;
  auto: boolean;
};

export const addCropLog = async (log: LogType): Promise<LogType> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLI_API}/log/crop`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(log),
    });

    if (!response.ok) {
      throw new Error(`Failed to add crop log: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error in addCropLog: ', error);
    throw error;
  }
};
