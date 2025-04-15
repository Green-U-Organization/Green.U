type TagsType = {
  tags: string[];
};

export const addUserTag = async (
  tags: TagsType,
  userId: number
): Promise<TagsType> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API}/tags/list/user/${userId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tags),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to add user tags: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error in addUserTags: ', error);
    throw error;
  }
};
