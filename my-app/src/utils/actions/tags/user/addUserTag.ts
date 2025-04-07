type TagType = {
  tag: string;
};

export const addUserTag = async (
  tag: TagType,
  userId: number
): Promise<TagType> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API}/tags/user/${userId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tag),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to add user tag: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error in addUserTag: ', error);
    throw error;
  }
};
