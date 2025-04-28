type TagsType = {
  tags: string[];
};

export const addGardenTag = async (
  tags: TagsType,
  gardenId: number
): Promise<TagsType> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API}/tags/list/garden/${gardenId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tags),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to add garden tags: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error in addGardenTags: ', error);
    throw error;
  }
};
