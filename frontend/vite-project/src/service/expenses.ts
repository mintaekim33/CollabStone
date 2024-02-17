import * as expensesAPI from '../api/expenses'

export async function submitExpense(expenseData: any) {
    const data = await expensesAPI.createExpense(expenseData);
    return data;
}