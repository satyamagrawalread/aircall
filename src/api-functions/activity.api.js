export const getActivitiesData = async () => {
  try {
    const response = await fetch(
      "https://cerulean-marlin-wig.cyclic.app/activities",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const result = await response.json();
    return result.map((data) => ({ ...data, isSelected: false }));
  } catch (error) {
    console.error(error);
  }
};

export const handleArchive = async (id) => {
  const response = await fetch(
    `https://cerulean-marlin-wig.cyclic.app/activities/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        is_archived: true,
      }),
    }
  );
  if (!response.ok) {
    throw new Error("Unable to archive");
  }
};

export const handleUnarchive = async (id) => {
  const response = await fetch(
    `https://cerulean-marlin-wig.cyclic.app/activities/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        is_archived: false,
      }),
    }
  );
  if (!response.ok) {
    throw new Error("Unable to archive");
  }
};
