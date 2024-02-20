import { Route, Routes } from "react-router-dom";
import "./App.css";
import { useEffect, useState, useRef } from "react";
import { Button } from "react-bootstrap";
import AddExpense from "./components/AddExpense";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import { fetchExpensesData } from "./service/expenses";
import ExpenseItem from "./components/ExpenseItem";
import EditExpense from "./components/EditExpense";

interface Expense {
  _id?: string;
  amount?: number;
  category?: string;
  note?: string;
  paymentMethod?: string;
  date?: string;
}

// interface ExpenseProps {
//   expense: Expense;
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

function App() {
  const [addModalShow, setAddModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [expenses, setExpenses] = useState<Expense[]>([]); // backend data
  const [events, setEvents] = useState<CalendarEvent[]>([]); // frontend data

  const splitDate = new Date().toLocaleDateString().split("/"); // "dd/MM/yyyy"
  const formattedDate = `${splitDate[2]}-${splitDate[1]}-${splitDate[0]}`; // "yyyy-MM-dd"
  const [formData, setFormData] = useState<FormData>({
    // date: new Date().toISOString().split("T")[0], // Get today's date in 'YYYY-MM-DD' format
    date: formattedDate, // Get today's date in 'YYYY-MM-DD' format
  });

  const [selectedExpenseId, setSelectedExpenseId] = useState(null);
  const selectedExpense = expenses.find((x) => x._id === selectedExpenseId);

  const fullCalendarRef = useRef(null);

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

  /// for rendering expenses data from DB
  /// if the expense is edited/deleted, need API call and update events state together
  useEffect(() => {
    const fetchData = async () => {
      const expenses = await fetchExpensesData();
      setExpenses(expenses);
    };
    fetchData();
    console.log("EXPENSES: ", expenses);
  }, []);

  // function handleEvents() {
  //   setEvents([...events, expense]);
  // }

  return (
    <>
      {/* <div className="flex justify-center align-center bg-red-300"> */}
      {/* <Button
        className=""
        variant="primary"
        // onClick={() => console.log("expenses: ", expenses)}
        onClick={() => setModalShow(true)}
      >
        Add an expense
      </Button> */}
      {/* </div> */}
      <AddExpense
        show={addModalShow}
        onHide={() => setAddModalShow(false)}
        calendar={fullCalendarRef} // pass ref prop to form component
        events={events}
        setEvents={setEvents}
        expenses={expenses}
        setExpenses={setExpenses}
        formData={formData}
        setFormData={setFormData}
      />
      <EditExpense
        show={editModalShow}
        onHide={() => setEditModalShow(false)}
        formData={formData}
        setFormData={setFormData}
        selectedExpense={selectedExpense}
      />

      <FullCalendar
        ref={fullCalendarRef} // set ref
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        // events={[
        //   { title: "event 1", date: "2024-02-20" },
        //   { title: "event 2", date: "2024-02-15" },
        // ]}
        events={events}
        // eventDidMount={}
      />

      <Button
        className=""
        variant="primary"
        // onClick={() => console.log("expenses: ", expenses)}
        onClick={() => {
          setAddModalShow(true);
          console.log("add MODALSHOW: ", addModalShow);
        }}
        // onClick={() => setModalShow(true)}
      >
        Add an expense
      </Button>
      {/* <Button
        className=""
        variant="primary"
        // onClick={() => console.log("expenses: ", expenses)}
        // onClick={() => setModalShow(true)}
        onClick={() => {
          setEditModalShow(true);
          console.log("edit MODALSHOW: ", editModalShow);
        }}
      >
        Edit an expense
      </Button> */}

      {/* list of expenses */}
      <div className="mx-20 my-10 p-10 bg-sky-100 flex flex-col items-center gap-3">
        <p>List of expenses</p>
        {expenses &&
          expenses.map((expense) => {
            return (
              <ExpenseItem
                key={expense._id}
                expense={expense}
                editModalShow={editModalShow}
                setEditModalShow={setEditModalShow}
                formData={formData}
                setSelectedExpenseId={setSelectedExpenseId}
                selectedExpense={selectedExpense}
              />
            );
          })}
        {/* // expenses.map((expense, idx) => {
          //   return <ExpenseItem key={idx} expense={expense} />;
          // })} */}
      </div>
    </>
  );
}

export default App;
