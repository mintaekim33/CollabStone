import { Route, Routes } from "react-router-dom";
import "./App.css";
import { useEffect, useState, useRef, createContext } from "react";
import { fetchTransactionsData } from "./service/transactions";
import UpdateTransaction from "./components/UpdateTransaction";
import MainPage from "./components/MainPage";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import { getUser } from "./service/users";
import Auth from "./components/Auth";
import Menubar from "./components/Menubar";
import { getToken } from "./util/security";
import Landing from "./components/Landing";

interface Transaction {
  _id?: string;
  date?: string;
  type?: string;
  category?: string;
  amount?: number;
  note?: string;
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
  const [user, setUser] = useState(getUser());
  const [userId, setUserId] = useState("");

  // retrieve user id when logged in
  useEffect(() => {
    const token = getToken();
    const payload = token
      ? JSON.parse(atob(token.split(".")[1])).payload
      : null;
    if (payload && payload._id) {
      setUserId(payload._id);
    }
  }, [user]);

  // const fullCalendarRef = useRef(null);

  // for rendering transactions data from DB
  // if the transaction is edited/deleted, need API call and update events state together

  // fetch user-specific transaction items when logging in as a different user
  useEffect(() => {
    const fetchData = async () => {
      const transactions = await fetchTransactionsData();
      setTransactions(transactions);
    };
    fetchData();
  }, [user]);

  return (
    <>
      <Menubar user={user} setUser={setUser} />
      {user ? (
        <>
          <Routes>
            <Route
              path="/"
              element={
                <MainPage
                  transactions={transactions}
                  setTransactions={setTransactions}
                  userId={userId}
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
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<LogIn setUser={setUser} />} />
          </Routes>
        </>
      ) : (
        <>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<LogIn setUser={setUser} />} />
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
