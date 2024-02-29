import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import { useEffect, useState, createContext } from "react";
import { fetchTransactionsData } from "./service/transactions";
import UpdateTransaction from "./components/UpdateTransaction";
import MainPage from "./components/MainPage";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import { getUser } from "./service/users";
import Menubar from "./components/Menubar";
import { getToken } from "./util/security";
import Landing from "./components/Landing";
import Dashboard from "./components/Dashboard";

interface Transaction {
  _id?: string;
  date?: string;
  type?: string;
  category?: string;
  amount?: number;
  note?: string;
}

// create context for transaction data
export const DataContext = createContext<any>(null);

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [user, setUser] = useState(getUser());
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  // retrieve user id when logged in
  useEffect(() => {
    // console.log("USER, USERID before: ", user, userId);
    const token = getToken();
    // console.log("GOT TOKEN: ", token);
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1])).payload;
      // console.log("GOT PAYLOAD: ", payload);
      if (payload && payload._id) {
        setUserId(payload._id);
        // console.log("GOT PAYLOADID: ", payload._id);
        // console.log("USER, USERID after: ", user, userId);
        // navigate("/");
      }
    }
  }, [user]);

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
                />
              }
            />
            <Route
              path="/dashboard"
              element={<Dashboard transactions={transactions} />}
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
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/login"
              element={
                <LogIn
                  setUser={setUser}
                  user={user}
                  userId={userId}
                  setUserId={setUserId}
                />
              }
            />
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
