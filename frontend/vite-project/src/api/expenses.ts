const BASE_URL = "http://localhost:3000/expenses";

export async function createExpense(expenseData: any) {
    const createURL = BASE_URL + '/create';

    try {
        const res = await fetch(createURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(expenseData)
        })
        if (res.ok) {
            return await res.json();
          } else {
            const errorData = await res.text();
            throw new Error(errorData);
          }
    } catch (error) {
        console.error("Error creating expense: ", error);
        throw error;
    }
}

export async function getExpenses() {
    const createURL = BASE_URL + '/getAll';
    try {
        const res = await fetch(createURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        if (res.ok) {
            // console.log("res - successfully called get endpoint : ", res)
            return await res.json();
        } else {
            //   console.log("res - failed to call get endpoint : ", res)
            const errorData = await res.text();
            throw new Error(errorData);
          }
    } catch (error) {
        console.log("error getting expense: ", error)
        console.error("Error getting expense: ", error);
        throw error;
    }
}