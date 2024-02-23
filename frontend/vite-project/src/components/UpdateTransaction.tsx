import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../App";
import {
  fetchTransactionData,
  updateTransaction,
} from "../service/transactions";
import { useParams, useNavigate } from "react-router-dom";

interface FormData {
  date?: string;
  category?: string;
  paymentMethod?: string;
  amount?: number;
  note?: string;
}

interface Transaction {
  _id?: string;
  amount?: number;
  category?: string;
  note?: string;
  paymentMethod?: string;
  date?: string;
}

function UpdateTransaction(props: any) {
  const {
    //transaction, // this is not being passed down from anywhere !
    selectedTransaction,
    //   selectedTransactionId,
    transactionData,
    transactions,
    setTransactions,
  } = props;
  //   const { transactions, setTransactions } = useContext(DataContext);
  //   const [editFormData, setEditFormData]= useState({
  //     date: '',
  //     category: '',
  //     paymentMethod: '',
  //     amount: 0,
  //     note: ''
  //   })
  const [editFormData, setEditFormData] = useState<FormData>();
  const [transactionToUpdate, setTransactionToUpdate] = useState<Transaction>();

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async (id: string) => {
      const transaction = await fetchTransactionData(id);
      console.log("transaction data: ", transaction);
      setTransactionToUpdate(transaction);
      setEditFormData({
        date: transaction.date,
        category: transaction.category,
        paymentMethod: transaction.paymentMethod,
        amount: transaction.amount,
        note: transaction.note,
      });
    };
    fetchData(id!);
  }, []);

  async function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();

    // console.log("SELECTED transaction: ", selectedTransaction); // send the transactionId using this
    // console.log("form data: ", editFormData); // with the data to update
    console.log("formformform: ", editFormData);
    // const transactionId = selectedTransaction._id;
    const transactionId = transactionToUpdate?._id; // NO TRANSACTION HERE

    try {
      const response = await updateTransaction(editFormData, transactionId!);
      // Upon successful submission, update local state with the edited transaction

      // update frontend UI (?)
      setTransactions(
        transactions.map((transaction: { _id: string }) => {
          if (transaction._id === response._id) {
            return response;
          }
          return transaction;
        })
      );

      console.log("form response: ", response);
    } catch (e) {
      console.log("Error submitting", e);
    }

    // go back to main page
    navigate("/");
  }

  return (
    <div className="bg-green-300">
      <form
        className="flex flex-col w-full max-w-sm mx-auto space-y-4 p-4 bg-white shadow-md rounded-md"
        onSubmit={handleSubmit}
      >
        <label className="text-gray-700">Date</label>
        <input
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
          type="date"
          value={editFormData?.date?.split("T")[0] || ""} // controlled by defining the state right from the start
          required
          onChange={(e) => {
            setEditFormData({
              ...editFormData,
              date: e.target.value,
            });
            // console.log("edit form data: ", editFormData);
          }}
        />

        <label className="text-gray-700">Category</label>
        <select
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
          value={editFormData?.category || ""}
          onChange={(e) => {
            setEditFormData({
              ...editFormData,
              category: e.target.value,
            });
          }}
        >
          <option>work</option>
          <option>home</option>
          <option>fun</option>
        </select>

        <label className="text-gray-700">Payment Method</label>
        <select
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
          value={editFormData?.paymentMethod || ""}
          onChange={(e) => {
            setEditFormData({
              ...editFormData,
              paymentMethod: e.target.value,
            });
          }}
        >
          <option>Cash</option>
          <option>credit card</option>
          <option>paylah</option>
        </select>

        <label className="text-gray-700">Amount</label>
        <input
          type="number"
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
          value={editFormData?.amount || ""}
          required
          autoFocus
          min="0"
          step=".01"
          onChange={(e) => {
            // const inputValue = e.target.value;
            // if (/^\d*\.?\d*$/.test(inputValue)) {
            setEditFormData({
              ...editFormData,
              amount: parseFloat(parseFloat(e.target.value).toFixed(2)), // toFixed returns a string
            });
            //   }
          }}
        />

        <label className="text-gray-700">Note</label>
        <input
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
          value={editFormData?.note || ""}
          onChange={(e) => {
            setEditFormData({
              ...editFormData,
              note: e.target.value,
            });
          }}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          type="submit"
          // onClick={props.onHide}
          //   onClick={() => console.log("EDIT FORM DATA: ", editFormData)}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default UpdateTransaction;
