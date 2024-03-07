import { useState } from "react";
import TransactionItem from "./TransactionItem";
import Pagination from "react-bootstrap/Pagination";

function TransactionTable(props: any) {
  const { selectedMonth, filterTransactionsByMonth, transactions } = props;
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Generate pagination items
  let items = [];
  for (
    let number = 1;
    number <= Math.ceil(transactions?.length / itemsPerPage);
    number++
  ) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => handlePageChange(number)}
      >
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
            ? filterTransactionsByMonth(transactions, selectedMonth)
                .slice(startIndex, endIndex)
                .map((transaction: { _id: any }) => (
                  <TransactionItem
                    key={transaction._id}
                    transaction={transaction}
                  />
                ))
            : transactions
                ?.slice(startIndex, endIndex)
                .map((transaction: { _id: any }) => (
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
