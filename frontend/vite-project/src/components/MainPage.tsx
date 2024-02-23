import "../App.css";
import { useEffect, useState, useRef, createContext } from "react";
import { Button } from "react-bootstrap";
import AddTransaction from "./AddTransaction";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import TransactionItem from "./TransactionItem";

// define structure for FormData type
interface FormData {
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

function MainPage(props: any) {
  const { transactions, setTransactions } = props;
  const [addModalShow, setAddModalShow] = useState(false);
  //   const [events, setEvents] = useState<CalendarEvent[]>([]); // frontend data

  const splitDate = new Date().toLocaleDateString().split("/"); // "dd/MM/yyyy"
  const formattedDate = `${splitDate[2]}-${splitDate[1]}-${splitDate[0]}`; // "yyyy-MM-dd"
  const [formData, setFormData] = useState<FormData>({
    date: formattedDate, // Get today's date in 'YYYY-MM-DD' format
  });
  //   const fullCalendarRef = useRef(null);

  // Load events from localStorage on component mount
  //   useEffect(() => {
  //     const storedEvents = localStorage.getItem("calendarEvents");
  //     if (storedEvents) {
  //       setEvents(JSON.parse(storedEvents));
  //     }
  //   }, []);

  return (
    <>
      <DataContext.Provider value={{ transactions, setTransactions }}>
        <AddTransaction
          show={addModalShow}
          onHide={() => setAddModalShow(false)}
          //   calendar={fullCalendarRef} // pass ref prop to form component
          //   events={events}
          //   setEvents={setEvents}
          transactions={transactions}
          setTransactions={setTransactions}
          formData={formData}
          setFormData={setFormData}
        />

        {/* <FullCalendar
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
        /> */}

        <Button
          className=""
          variant="primary"
          onClick={() => {
            setAddModalShow(true);
          }}
        >
          Add a transaction
        </Button>

        <div className="mx-20 my-10 p-10 bg-sky-100 flex flex-col items-center gap-3">
          <p>List of transactions</p>
          {transactions &&
            transactions.map((transaction: { _id: any }) => {
              return (
                <TransactionItem
                  key={transaction._id}
                  transaction={transaction}
                />
              );
            })}
        </div>
      </DataContext.Provider>
    </>
  );
}

export default MainPage;
