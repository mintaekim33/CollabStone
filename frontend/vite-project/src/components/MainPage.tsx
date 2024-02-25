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
  const { userId, transactions, setTransactions } = props;
  console.log("MAIN PAGE TRANSACTIONS: ", transactions);
  const [addModalShow, setAddModalShow] = useState(false);
  //   const [events, setEvents] = useState<CalendarEvent[]>([]); // frontend data

  const splitDate = new Date().toLocaleDateString().split("/"); // "dd/MM/yyyy"
  const formattedDate = `${splitDate[2]}-${splitDate[1]}-${splitDate[0]}`; // "yyyy-MM-dd"
  const [formData, setFormData] = useState<FormData>({
    date: formattedDate, // Get today's date in 'YYYY-MM-DD' format
  });

  // if there is user, add userId field to the form
  useEffect(() => {
    if (userId) {
      setFormData((prevState: any) => ({ ...prevState, userId: userId }));
    }
    console.log("Form Data : ", formData);
  }, [userId]);

  //   const fullCalendarRef = useRef(null);

  // Load events from localStorage on component mount
  //   useEffect(() => {
  //     const storedEvents = localStorage.getItem("calendarEvents");
  //     if (storedEvents) {
  //       setEvents(JSON.parse(storedEvents));
  //     }
  //   }, []);

  return (
    <div className="">
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
        <div className="flex justify-center mt-8">
          <Button
            className="mt-8 px-6 py-3 rounded-lg bg-blue-500 text-white font-semibold shadow-lg hover:bg-blue-600"
            variant="primary"
            onClick={() => {
              setAddModalShow(true);
            }}
          >
            Add a transaction
          </Button>
        </div>
        <div className=" flex justify-center">
          <div className=" w-1/2 p-10 flex flex-col justify-center items-center gap-3">
            <h2 className="">My transactions</h2>
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
        </div>
      </DataContext.Provider>
    </div>
  );
}

export default MainPage;
