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

interface expense {
  _id?: string;
  amount?: number;
  category?: string;
  note?: string;
  paymentMethod?: string;
}

interface CalendarEvent {
  title: string;
  start: string;
  allDay: boolean;
}

function App() {
  const [modalShow, setModalShow] = useState(false);
  const [expenses, setExpenses] = useState<expense[]>([]); // backend data
  const [events, setEvents] = useState<CalendarEvent[]>([]); // frontend data

  const fullCalendarRef = useRef(null);

  // Load events from localStorage on component mount
  useEffect(() => {
    const storedEvents = localStorage.getItem("calendarEvents");
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    }
  }, []);

  // // Save events to localStorage whenever the events state changes
  // useEffect(() => {
  //   localStorage.setItem("calendarEvents", JSON.stringify(events));
  // }, [events]);

  /// for rendering expenses data from DB
  /// if the expense is edited/deleted, need API call and update events state together
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const expenses = await fetchExpensesData();
  //     setExpenses(expenses);
  //   };
  //   fetchData();
  //   // console.log("EXPENSES: ", expenses);
  // }, []);

  // function handleEvents() {
  //   setEvents([...events, expense]);
  // }

  return (
    <>
      {/* {expenses &&
        expenses.map((expense) => {
          return <div key={expense._id}>{expense.amount}</div>;
        })} */}
      <div className="flex justify-center align-center bg-red-300">
        <Button
          className=""
          variant="primary"
          // onClick={() => console.log("expenses: ", expenses)}
          onClick={() => setModalShow(true)}
        >
          Add an expense
        </Button>
      </div>
      <AddExpense
        show={modalShow}
        onHide={() => setModalShow(false)}
        calendar={fullCalendarRef} // pass ref prop to form component
        events={events}
        setEvents={setEvents}
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
      />
    </>
  );
}

export default App;
