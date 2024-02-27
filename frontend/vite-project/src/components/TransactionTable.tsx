import TransactionItem from "./TransactionItem";

function TransactionTable(props: any) {
  const { selectedMonth, filterTransactionsByMonth, transactions } = props;

  return (
    <div>
      {selectedMonth !== null
        ? filterTransactionsByMonth(transactions, selectedMonth).map(
            (transaction: { _id: any }) => (
              <TransactionItem
                key={transaction._id}
                transaction={transaction}
              />
            )
          )
        : transactions &&
          transactions.map((transaction: { _id: any }) => (
            <TransactionItem key={transaction._id} transaction={transaction} />
          ))}
    </div>
  );
}

export default TransactionTable;
