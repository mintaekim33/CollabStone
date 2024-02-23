import { Route, Routes } from "react-router-dom";
import "./App.css";
import { useEffect, useState, useRef, createContext } from "react";
import AddTransaction from "./components/AddTransaction";
import TransactionItem from "./components/TransactionItem";
import EditTransaction from "./components/EditTransaction";
import { fetchTransactionsData } from "./service/transactions";
import UpdateTransaction from "./components/UpdateTransaction";
import MainPage from "./components/MainPage";

interface Transaction {
  _id?: string;
  amount?: number;
  category?: string;
  note?: string;
  paymentMethod?: string;
  date?: string;
}

// // define structure for FormData type
// interface FormData {
//   date?: string;
//   category?: string;
//   paymentMethod?: string;
//   amount?: number;
//   note?: string;
// }

// interface CalendarEvent {
//   title: string;
//   start: string;
//   allDay: boolean;
// }

// create context for transaction data
export const DataContext = createContext<any>(null);

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]); // backend data
  // const [events, setEvents] = useState<CalendarEvent[]>([]); // frontend data

  // const splitDate = new Date().toLocaleDateString().split("/"); // "dd/MM/yyyy"
  // const formattedDate = `${splitDate[2]}-${splitDate[1]}-${splitDate[0]}`; // "yyyy-MM-dd"
  // const [formData, setFormData] = useState<FormData>({
  //   // date: new Date().toISOString().split("T")[0], // Get today's date in 'YYYY-MM-DD' format
  //   date: formattedDate, // Get today's date in 'YYYY-MM-DD' format
  // });

  // const [selectedTransactionId, setSelectedTransactionId] = useState(null);
  // const selectedTransaction = transactions.find(
  //   (x) => x._id === selectedTransactionId
  // );

  // const fullCalendarRef = useRef(null);

  // Load events from localStorage on component mount
  // useEffect(() => {
  //   const storedEvents = localStorage.getItem("calendarEvents");
  //   if (storedEvents) {
  //     setEvents(JSON.parse(storedEvents));
  //   }
  // }, []);

  /// for rendering transactions data from DB
  /// if the transaction is edited/deleted, need API call and update events state together
  useEffect(() => {
    const fetchData = async () => {
      const transactions = await fetchTransactionsData();
      setTransactions(transactions);
    };
    fetchData();
  }, []);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <MainPage
              transactions={transactions}
              setTransactions={setTransactions}
            />
          }
        />
        <Route
          path="/transaction/:id"
          element={
            <UpdateTransaction
              transactions={transactions}
              setTransactions={setTransactions}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
