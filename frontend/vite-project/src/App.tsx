import { Route, Routes } from "react-router-dom";
import "./App.css";
import { useEffect, useState, useRef, createContext } from "react";
import { Button } from "react-bootstrap";
import AddTransaction from "./components/AddTransaction";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import TransactionItem from "./components/TransactionItem";
import EditTransaction from "./components/EditTransaction";
import { fetchTransactionsData } from "./service/transactions";

interface Transaction {
  _id?: string;
  amount?: number;
  category?: string;
  note?: string;
  paymentMethod?: string;
  date?: string;
}

// interface TransactionProps {
//   transaction: Transaction;
// }

// define structure for FormData type
interface FormData {
  date?: string;
  category?: string;
  paymentMethod?: string;
  amount?: number;
  note?: string;
}

interface CalendarEvent {
  title: string;
  start: string;
  allDay: boolean;
}

// create context for transaction data
export const DataContext = createContext<any>(null);

function App() {
  const [addModalShow, setAddModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]); // backend data
  const [events, setEvents] = useState<CalendarEvent[]>([]); // frontend data

  const splitDate = new Date().toLocaleDateString().split("/"); // "dd/MM/yyyy"
  const formattedDate = `${splitDate[2]}-${splitDate[1]}-${splitDate[0]}`; // "yyyy-MM-dd"
  const [formData, setFormData] = useState<FormData>({
    // date: new Date().toISOString().split("T")[0], // Get today's date in 'YYYY-MM-DD' format
    date: formattedDate, // Get today's date in 'YYYY-MM-DD' format
  });

  const [selectedTransactionId, setSelectedTransactionId] = useState(null);
  const selectedTransaction = transactions.find(
    (x) => x._id === selectedTransactionId
  );

  const fullCalendarRef = useRef(null);

  // console.log("transactions: ", transactions);

  // Load events from localStorage on component mount
  useEffect(() => {
    const storedEvents = localStorage.getItem("calendarEvents");
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    }
    // console.log("NOW - ISO: ", new Date().toISOString());
    // console.log("NOW - localstring: ", new Date().toLocaleString());
    // console.log("NOW - localedatestring: ", new Date().toLocaleDateString());
  }, []);

  // // Save events to localStorage whenever the events state changes
  // useEffect(() => {
  //   localStorage.setItem("calendarEvents", JSON.stringify(events));
  // }, [events]);

  /// for rendering transactions data from DB
  /// if the transaction is edited/deleted, need API call and update events state together
  useEffect(() => {
    const fetchData = async () => {
      const transactions = await fetchTransactionsData();
      // console.log("transactions: ", transactions);
      setTransactions(transactions);
    };
    fetchData();
    // console.log("transactions: ", transactions);
  }, []);

  // function handleEvents() {
  //   setEvents([...events, transaction]);
  // }

  return (
    <>
      <DataContext.Provider value={{ transactions, setTransactions }}>
        <AddTransaction
          show={addModalShow}
          onHide={() => setAddModalShow(false)}
          calendar={fullCalendarRef} // pass ref prop to form component
          events={events}
          setEvents={setEvents}
          transactions={transactions}
          setTransactions={setTransactions}
          formData={formData}
          setFormData={setFormData}
        />
        {/* <EditTransaction
          show={editModalShow}
          onHide={() => setEditModalShow(false)}
          selectedTransaction={selectedTransaction}
        /> */}

        <FullCalendar
          ref={fullCalendarRef} // set ref
          plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          events={events}
          // eventDidMount={}
        />

        <Button
          className=""
          variant="primary"
          // onClick={() => console.log("transactions: ", transactions)}
          onClick={() => {
            setAddModalShow(true);
            console.log("add MODALSHOW: ", addModalShow);
          }}
          // onClick={() => setModalShow(true)}
        >
          Add a transaction
        </Button>

        <div className="mx-20 my-10 p-10 bg-sky-100 flex flex-col items-center gap-3">
          <p>List of transactions</p>
          {transactions &&
            transactions.map((transaction) => {
              return (
                <TransactionItem
                  key={transaction._id}
                  transaction={transaction}
                  editModalShow={editModalShow}
                  setEditModalShow={setEditModalShow}
                  formData={formData}
                  setSelectedTransactionId={setSelectedTransactionId}
                  selectedTransaction={selectedTransaction}
                />
              );
            })}
        </div>
      </DataContext.Provider>
    </>
  );
}

export default App;
