import { useContext, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import {
  fetchTransactionData,
  updateTransaction,
} from "../service/transactions";
import { useParams } from "react-router-dom";
import { DataContext } from "../App";

interface FormData {
  date?: string;
  category?: string;
  paymentMethod?: string;
  amount?: number;
  note?: string;
}

function EditTransaction(props: any) {
  const {
    editedFormData,
    setEditedFormData,
    transaction,
    selectedTransaction,
    selectedTransactionId,
    transactionData,
    ...rest
  } = props;
  const { transactions, setTransactions } = useContext(DataContext);
  //   const [editedFormData, setEditedFormData] = useState<FormData>({});

  // console.log("edit transactions; ", transactions);

  // const selectedTransaction = transactions.find(
  //   (transaction: { _id: string }) => transaction._id === selectedTransactionId
  // );

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const item = await fetchTransactionData(transaction._id);
  //     console.log(item);
  //   };
  //   fetchData();
  // }, []);

  // console.log("formformform: ", editedFormData);

  // console.log("selected tran: ", selectedTransaction);

  //   console.log("edit transaction; ", transaction);

  //   setEditedFormData({
  //     date: transactionData.date,
  //     category: transactionData.category,
  //     paymentMethod: transactionData.paymentMethod,
  //     amount: transactionData.amount,
  //     note: transactionData.note,
  //   });

  async function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();

    // console.log("SELECTED transaction: ", selectedTransaction); // send the transactionId using this
    // console.log("form data: ", editedFormData); // with the data to update
    console.log("formformform: ", editedFormData);
    // const transactionId = selectedTransaction._id;
    const transactionId = transaction._id;

    try {
      const response = await updateTransaction(editedFormData, transactionId);
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
    // // close modal
    rest.onHide();
  }

  return (
    <>
      <Modal
        {...rest}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit a transaction
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            className="flex flex-col w-full max-w-sm mx-auto space-y-4 p-4 bg-white shadow-md rounded-md"
            onSubmit={handleSubmit}
          >
            <label className="text-gray-700">Date</label>
            <input
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
              type="date"
              // value={tem.date || ""} // controlled by defining the state right from the start
              value={"data"} // controlled by defining the state right from the start
              // value={editedFormData.date || ""} // controlled by defining the state right from the start
              required
              onChange={(e) => {
                setEditedFormData({
                  ...editedFormData,
                  date: e.target.value,
                });
                console.log("edit form data: ", editedFormData);
              }}
            />

            <label className="text-gray-700">Category</label>
            <select
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
              value={"data"}
              // value={editedFormData.category || ""}
              onChange={(e) => {
                setEditedFormData({
                  ...editedFormData,
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
              value={editedFormData.paymentMethod || ""}
              onChange={(e) => {
                setEditedFormData({
                  ...editedFormData,
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
              value={editedFormData.amount || ""}
              required
              autoFocus
              min="0"
              step=".01"
              onChange={(e) => {
                // const inputValue = e.target.value;
                // if (/^\d*\.?\d*$/.test(inputValue)) {
                setEditedFormData({
                  ...editedFormData,
                  amount: parseFloat(parseFloat(e.target.value).toFixed(2)), // toFixed returns a string
                });
                //   }
              }}
            />

            <label className="text-gray-700">Note</label>
            <input
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
              value={editedFormData.note || ""}
              onChange={(e) => {
                setEditedFormData({
                  ...editedFormData,
                  note: e.target.value,
                });
              }}
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              type="submit"
              // onClick={props.onHide}
              onClick={() => console.log("EDIT FORM DATA: ", editedFormData)}
            >
              Submit
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default EditTransaction;
