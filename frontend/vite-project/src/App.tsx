import { Route, Routes } from "react-router-dom";
import "./App.css";
import { useEffect, useState, useRef, createContext } from "react";
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

  // const fullCalendarRef = useRef(null);

  // for rendering transactions data from DB
  // if the transaction is edited/deleted, need API call and update events state together
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
              // events={events}
              // setEvents={setEvents}
              // fullCalendarRef={fullCalendarRef}
            />
          }
        />
        <Route
          path="/transaction/:id"
          element={
            <UpdateTransaction
              transactions={transactions}
              setTransactions={setTransactions}
              // events={events}
              // setEvents={setEvents}
              // calendar={fullCalendarRef}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
