import { useState } from "react";
import { Button } from "react-bootstrap";
import EditTransaction from "./EditTransaction";
import { fetchTransactionData } from "../service/transactions";

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
  const [transactionData, setTransactionData] = useState();

  async function fetchData(id: string) {
    const data = await fetchTransactionData(id); // get selected transaction and then fetch data
    // setTransactionData(data);
    // if (!data.ok) {
    //   throw new Error("Failed to fetch data");
    // }
    console.log("FETCHED TRANSACTION DATA: ", data);
    setEditedFormData({
      date: data.date,
      category: data.category,
      paymentMethod: data.paymentMethod,
      amount: data.amount,
      note: data.note,
    });
  }
  //     console.log("FORM TO EDIT: ", editedFormData);
  //   console.log("transactionData", transactionData);
  //   console.log("transaction?? : ", transaction);

  //   console.log("transaction item's transaction: ", transaction);
  return (
    <>
      {/* {transaction && ( */}
      <div className="flex gap-5">
        <div>{transaction.date?.split("T")[0]}</div>
        <div>${transaction.amount}</div>
        <div>{transaction.category}</div>
        <div>{transaction.paymentMethod}</div>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          //   variant="primary"
          // onClick={() => console.log("transactions: ", transactions)}
          // onClick={() => setModalShow(true)}
          onClick={() => {
            // console.log("edit MODALSHOW: ", editModalShow);
            // console.log("Form Data: ", formData);
            // get this item's id and store it to find the correct item from the transactions list
            setSelectedTransactionId(transaction._id);
            // console.log("SELECTED transaction: ", selectedTransaction);
            fetchData(transaction._id);
            // console.log("transactionData", transactionData);
            // console.log("FORM TO EDIT: ", editedFormData);
            setEditModalShow(true);
          }}
        >
          Edit an transaction
        </button>
        <EditTransaction
          show={editModalShow}
          onHide={() => setEditModalShow(false)}
          selectedTransaction={selectedTransaction}
          transaction={transaction}
          editedFormData={editedFormData}
          setEditedFormData={setEditedFormData}
          transactionData={transactionData}
        />
      </div>
      {/* )} */}
    </>
  );
}

export default TransactionItem;
