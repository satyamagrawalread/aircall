export const getActivitiesData = async () => {
    try {
        const response = await fetch('https://cerulean-marlin-wig.cyclic.app/activities', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }

        const result = await response.json();
        console.log(result);
        // setActivitiesData(result);
        return result;

    } catch (error) {
        console.error(error);
        console.error("Something Went Wrong");
    }
}