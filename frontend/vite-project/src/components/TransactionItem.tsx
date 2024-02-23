import { useState } from "react";
import { Button } from "react-bootstrap";
import EditTransaction from "./EditTransaction";
import { fetchTransactionData } from "../service/transactions";
import UpdateTransaction from "./UpdateTransaction";
import { Link } from "react-router-dom";

interface Transaction {
  _id?: string;
  amount?: number;
  category?: string;
  note?: string;
  paymentMethod?: string;
  date?: string;
}

interface TransactionItemProps {
  transaction: Transaction; // Specify the type of the Transaction prop
}

interface FormData {
  date?: string;
  category?: string;
  paymentMethod?: string;
  amount?: number;
  note?: string;
}

// function TransactionItem({ transaction }: TransactionItemProps) {
function TransactionItem(props: any) {
  const {
    formData,
    transaction,
    editModalShow,
    setEditModalShow,
    setSelectedTransactionId,
    selectedTransaction,
    ...rest
  } = props;
  //   const [editModalShow, setEditModalShow] = useState(false);
  const [editedFormData, setEditedFormData] = useState<FormData>({});
  const [transactionData, setTransactionData] = useState({});
  // const [updateTransaction, setUpdateTransaction] = useState(false);

  // async function fetchData(id: string) {
  //   const data = await fetchTransactionData(id); // get selected transaction and then fetch data
  //   setEditedFormData({
  //     date: data.date,
  //     category: data.category,
  //     paymentMethod: data.paymentMethod,
  //     amount: data.amount,
  //     note: data.note,
  //   });
  // }

  console.log("trand: ", transaction);

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
            onMouseOver={() => {
              // setSelectedTransactionId(transaction._id);
              // fetchData(transaction._id);
              // console.log(editedFormData);
            }}
            onClick={() => {
              // get this item's id and store it to find the correct item from the transactions list
              // console.log(selectedTransaction);
              // console.log("transaction._id", transaction._id);
              // setSelectedTransactionId(transaction._id);
              //          fetchData(transaction._id);
              // setEditModalShow(true);
              // setUpdateTransaction(true);
            }}
          >
            Edit a transaction
          </button>
        </Link>
        {/* <EditTransaction
          show={editModalShow}
          onHide={() => setEditModalShow(false)}
          selectedTransaction={selectedTransaction}
          transaction={transaction}
          editedFormData={editedFormData}
          setEditedFormData={setEditedFormData}
          transactionData={transactionData}
        // /> */}
        {/* {updateTransaction && ( */}
        {/* <UpdateTransaction
          selectedTransaction={selectedTransaction}
          transaction={transaction}
          editedFormData={editedFormData}
          setEditedFormData={setEditedFormData}
          transactionData={transactionData}
        /> */}
        {/* // )} */}
      </div>
    </>
  );
}

export default TransactionItem;
