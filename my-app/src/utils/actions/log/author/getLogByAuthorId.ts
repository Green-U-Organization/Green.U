export const getLogByAuthorId = async (authorId: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLI_API}/log/author/${authorId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to get author log data: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error in getLogByAuthorId: ', error);
    throw error;
  }
};
