import { Link } from "react-router-dom";

function TransactionItem(props: any) {
  const { transaction } = props;

  return (
    <>
      <div className="flex gap-5 bg-red-300">
        <div>{transaction.date?.split("T")[0]}</div>
        <div>${transaction.amount}</div>
        <div>{transaction.category}</div>
        <div>{transaction.paymentMethod}</div>
        <Link to={"/transaction/" + transaction._id}>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            //   variant="primary"
          >
            Edit a transaction
          </button>
        </Link>
      </div>
    </>
  );
}

export default TransactionItem;
