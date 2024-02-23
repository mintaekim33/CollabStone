const BASE_URL = "http://localhost:3000/transactions";

export async function createTransaction(transactionData: any) {
    const createURL = BASE_URL + '/create';

    try {
        const res = await fetch(createURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(transactionData)
        })
        if (res.ok) {
            return await res.json();
          } else {
            const errorData = await res.text();
            throw new Error(errorData);
          }
    } catch (error) {
        console.error("Error creating transaction: ", error);
        throw error;
    }
}

export async function getTransactions() {
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
        console.log("error getting transaction: ", error)
        console.error("Error getting transaction: ", error);
        throw error;
    }
}

export async function getTransaction(id: string) {
    const getURL = BASE_URL + `/get/${id}`;
    try {
        const res = await fetch(getURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        if (res.ok) {
            // console.log("data read successfully! ", res)
            return await res.json();
        } else {
            console.error("failed to read data ", res)
            const errorData = await res.text();
            throw new Error(errorData);
          }
    } catch (error) {
        console.log("error getting transaction: ", error)
        console.error("Error getting transaction: ", error);
        throw error;
    }
}


export async function editTransaction(editedFormData: any, id: string) {
    const editURL = BASE_URL + `/edit/${id}`
    try {
        const res = await fetch(editURL, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(editedFormData)
        })
        if (res.ok) {
            console.log("data updated successfully! ", res)
            return await res.json();
        } else {
              console.error("data failed to update ", res)
            // const errorData = await res.text();
            // throw new Error(errorData);
          }
    } catch (error) {
        console.log("error getting transaction: ", error)
        console.error("Error getting transaction: ", error);
        throw error;
    }
}