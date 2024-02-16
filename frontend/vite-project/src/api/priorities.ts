const BASE_URL = "http://localhost:3000/priorities";

export async function createPriority(priorityData: any) {
    const createURL = BASE_URL + '/create';

    try {
        const res = await fetch(createURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(priorityData)
        })
        if (res.ok) {
            return await res.json();
          } else {
            const errorData = await res.text();
            throw new Error(errorData);
          }
    } catch (error) {
        console.error("Error creating priority: ", error);
        throw error;
    }
}