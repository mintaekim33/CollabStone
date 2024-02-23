import { useEffect, useState } from "react";
import {
  deleteTransaction,
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
  const { transactions, setTransactions } = props;
  //   const [editFormData, setEditFormData]= useState({
  //     date: '',
  //     category: '',
  //     paymentMethod: '',
  //     amount: 0,
  //     note: ''
  //   })
  const [editFormData, setEditFormData] = useState<FormData>();
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction>();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async (id: string) => {
      const transaction = await fetchTransactionData(id);
      console.log("transaction data: ", transaction);
      setSelectedTransaction(transaction);
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
    const transactionId = selectedTransaction?._id;

    try {
      const response = await updateTransaction(editFormData, transactionId!);
      // Upon successful submission, update local state with the edited transaction

      // update frontend UI
      setTransactions(
        transactions.map((transaction: { _id: string }) => {
          if (transaction._id === response._id) {
            return response;
          }
          return transaction;
        })
      );

      //   console.log("form response: ", response);
    } catch (e) {
      console.log("Error submitting", e);
    }
    // go back to main page
    navigate("/");

    // update the calendar events
    //     const updatedEvents = events.map((event: { id: any; }) => {
    //         if (event.id === updatedEvent.id) {
    //           return { ...event, ...updatedEvent }; // Update only the modified properties
    //         }
    //         return event;
    //       });
    //       setEvents(updatedEvents);
  }

  async function handleDelete(e: { preventDefault: () => void }) {
    e.preventDefault();

    try {
      const transactionId = selectedTransaction?._id;
      console.log("T ID: ", transactionId);
      const response = await deleteTransaction(transactionId!);

      // update frontend UI
      setTransactions((prevTransactions: any[]) =>
        prevTransactions.filter(
          (transaction: { _id: string }) => transaction._id !== response._id
        )
      );
    } catch (e) {
      console.log("Error submitting", e);
    }
    // return to main page
    navigate("/");
  }

  return (
    <div className="p-20 bg-green-200">
      <form
        className="flex flex-col w-full max-w-sm mx-auto space-y-4 p-4 bg-white shadow-md rounded-md"
        // onSubmit={handleSubmit}
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
          <option>Food</option>
          <option>Shopping</option>
          <option>Entertainment</option>
          <option>Investment</option>
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
          <option>Credit Card</option>
          <option>Paylah</option>
          <option>Paynow</option>
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
        <div className="flex">
          <button
            className="basis-1/2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            // type="submit"
            onClick={handleSubmit}
          >
            Edit
          </button>
          <button
            className="basis-1/2 bg-blue-300 text-white rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-500"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateTransaction;