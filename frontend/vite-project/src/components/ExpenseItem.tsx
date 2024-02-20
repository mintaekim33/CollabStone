import { useState } from "react";
import { Button } from "react-bootstrap";

interface Expense {
  _id?: string;
  amount?: number;
  category?: string;
  note?: string;
  paymentMethod?: string;
  date?: string;
}

interface ExpenseItemProps {
  expense: Expense; // Specify the type of the expense prop
}

// function ExpenseItem({ expense }: ExpenseItemProps) {
function ExpenseItem(props: any) {
  const {
    formData,
    expense,
    editModalShow,
    setEditModalShow,
    setSelectedExpenseId,
    selectedExpense,
    ...rest
  } = props;
  //   const [editModalShow, setEditModalShow] = useState(false);

  //   console.log("expense item's expense: ", expense);
  return (
    <>
      {/* {expense && ( */}
      <div className="flex gap-5">
        <div>{expense.date?.split("T")[0]}</div>
        <div>${expense.amount}</div>
        <div>{expense.category}</div>
        <div>{expense.paymentMethod}</div>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          //   variant="primary"
          // onClick={() => console.log("expenses: ", expenses)}
          // onClick={() => setModalShow(true)}
          onClick={() => {
            setEditModalShow(true);
            console.log("edit MODALSHOW: ", editModalShow);
            console.log("Form Data: ", formData);
            // get this item's id and store it to find the correct item from the expenses list
            setSelectedExpenseId(expense._id);
            console.log("SELECTED EXPENSE: ", selectedExpense);
          }}
        >
          Edit an expense
        </button>
      </div>
      {/* )} */}
    </>
  );
}

export default ExpenseItem;
