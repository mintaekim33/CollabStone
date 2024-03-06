import TransactionItem from "./TransactionItem";
import Pagination from "react-bootstrap/Pagination";

function TransactionTable(props: any) {
  const { selectedMonth, filterTransactionsByMonth, transactions } = props;

  let active = 2;
  let items = [];
  for (let number = 1; number <= 5; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active}>
        {number}
      </Pagination.Item>
    );
  }

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
          <Pagination>{items}</Pagination>
        </>
      )}
    </div>
  );
}

export default TransactionTable;
