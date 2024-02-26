import Modal from "react-bootstrap/Modal";
import { submitTransaction } from "../service/transactions";
import { getUser } from "../service/users";
import { useEffect } from "react";

function AddTransaction(props: any) {
  const {
    formData,
    setFormData,
    transactions,
    setTransactions,
    // events,
    // setEvents,
    ...rest
  } = props;

  async function handleSubmit(e: { preventDefault: () => void }) {
    console.log("form", formData);
    e.preventDefault();
    console.log("ADD BUTTON");

    try {
      const response = await submitTransaction(formData);
      // Upon successful submission, update local state with the newly created transaction
      setTransactions((prevTransactions: any) => [
        ...prevTransactions,
        response,
      ]);

      console.log("form response: ", response);
    } catch (e) {
      console.log("Error submitting", e);
    }
    // close modal
    rest.onHide();
    // clear amount
    setFormData({
      ...formData,
      amount: 0,
    });

    // Add transaction record
    // const fullCalendarApi = rest.calendar.current.getApi();
    // const transaction = {
    //   title: formData.amount,
    //   start: formData.date, // Set the start time of the event
    //   allDay: true, // Set to true if the event lasts all day
    // };
    // fullCalendarApi.addEvent(transaction); // Add the event to the calendar

    // // Update events state using the callback version of setEvents
    // setEvents((prevEvents: any) => {
    //   const updatedEvents = [...prevEvents, transaction];
    //   // Save updated events to localStorage
    //   localStorage.setItem("calendarEvents", JSON.stringify(updatedEvents));
    //   // console.log("Updated events : ", updatedEvents);
    //   return updatedEvents;
    // });

    // console.log("FORM DATA: ", formData);
    // console.log("transaction DATA: ", transaction);
  }

  return (
    <Modal
      {...rest}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add a transaction
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
            value={formData.date} // controlled by defining the state right from the start
            placeholder="Today"
            required
            onChange={(e) => {
              setFormData({
                ...formData,
                date: e.target.value,
              });
            }}
          />

          <label className="text-gray-700">Type</label>
          <select
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            value={formData.type || ""}
            onChange={(e) => {
              setFormData({
                ...formData,
                type: e.target.value,
              });
            }}
          >
            <option>Expense</option>
            <option>Income</option>
          </select>

          <label className="text-gray-700">Category</label>
          <select
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            value={formData.category || ""}
            onChange={(e) => {
              setFormData({
                ...formData,
                category: e.target.value,
              });
              console.log("category: ", formData.category);
            }}
          >
            {formData.type === "Income" ? (
              <option>Investment</option>
            ) : (
              <>
                <option>Food</option>
                <option>Shopping</option>
                <option>Entertainment</option>
              </>
            )}
          </select>

          <label className="text-gray-700">Amount</label>
          <input
            type="number"
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            value={formData.amount || ""}
            required
            autoFocus
            min="0"
            step=".01"
            onChange={(e) => {
              // const inputValue = e.target.value;
              // if (/^\d*\.?\d*$/.test(inputValue)) {
              setFormData({
                ...formData,
                amount: parseFloat(parseFloat(e.target.value).toFixed(2)), // toFixed returns a string
              });

              // }
            }}
          />

          <label className="text-gray-700">Note</label>
          <input
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            value={formData.note || ""}
            onChange={(e) => {
              setFormData({
                ...formData,
                note: e.target.value,
              });
            }}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            type="submit"
            // onClick={props.onHide}
          >
            Add
          </button>
        </form>
      </Modal.Body>
      {/* <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer> */}
    </Modal>
  );
}

export default AddTransaction;
