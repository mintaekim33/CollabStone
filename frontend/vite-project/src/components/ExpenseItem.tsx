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

function ExpenseItem({ expense }: ExpenseItemProps) {
  //   console.log("expense item's expense: ", expense);
  return (
    <>
      {/* {expense && ( */}
      <div className="flex gap-5">
        <div>{expense.date?.split("T")[0]}</div>
        <div>${expense.amount}</div>
        <div>{expense.category}</div>
        <div>{expense.paymentMethod}</div>
      </div>
      {/* )} */}
    </>
  );
}

export default ExpenseItem;
