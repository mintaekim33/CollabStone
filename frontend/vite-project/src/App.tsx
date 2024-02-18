import { Route, Routes } from "react-router-dom";
import "./App.css";
import { useState } from "react";
import { Button } from "react-bootstrap";
import AddExpense from "./components/AddExpense";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";

function App() {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <div className="flex justify-center align-center bg-red-300">
        <Button
          className=""
          variant="primary"
          onClick={() => setModalShow(true)}
        >
          Add an expense
        </Button>
      </div>
      <AddExpense show={modalShow} onHide={() => setModalShow(false)} />
      <div>
        {/* <Routes>
          <Route path="/add" element={<CreatePriorityForm />} />
        </Routes> */}
      </div>
      {/* daily, weekly, monthly calendar view */}
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          // Define the header toolbar
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
      />
    </>
  );
}

export default App;
