import * as transactionsAPI from '../api/transactions'

export async function submitTransaction(transactionData: any) {
    const data = await transactionsAPI.createTransaction(transactionData);
    return data;
}

export async function fetchTransactionsData() {
    const data = await transactionsAPI.getTransactions();
    return data;
}

export async function fetchTransactionData(id: string) {
    const data = await transactionsAPI.getTransaction(id);
    return data;
}

export async function updateTransaction(editedFormData: any, id: string) {
    const data = await transactionsAPI.editTransaction(editedFormData, id);
    return data;
}

export async function deleteTransaction(id: string) {
    const data = await transactionsAPI.deleteTransaction(id);
    return data;
}