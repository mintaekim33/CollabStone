import TransactionItem from "./TransactionItem";

function TransactionTable(props: any) {
  const { selectedMonth, filterTransactionsByMonth, transactions } = props;

  return (
    <div className=" w-1/2 mb-20 ">
      {transactions?.length === 0 ? (
        <div className="mt-20 flex justify-center">
          <p className="text-gray-500">Start adding your transactions!</p>
        </div>
      ) : (
        <>
          {selectedMonth !== null
            ? filterTransactionsByMonth(transactions, selectedMonth).map(
                (transaction: { _id: any }) => (
                  <TransactionItem
                    key={transaction._id}
                    transaction={transaction}
                  />
                )
              )
            : transactions?.map((transaction: { _id: any }) => (
                <TransactionItem
                  key={transaction._id}
                  transaction={transaction}
                />
              ))}
        </>
      )}
    </div>
  );
}

export default TransactionTable;
