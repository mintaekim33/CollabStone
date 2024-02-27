import "../App.css";
import { useEffect, useState, useRef, createContext } from "react";
import { Button, Container } from "react-bootstrap";
import AddTransaction from "./AddTransaction";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import listPlugin from "@fullcalendar/list";
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
  const [addModalShow, setAddModalShow] = useState(false);
  //   const [events, setEvents] = useState<CalendarEvent[]>([]); // frontend data

  const splitDate = new Date().toLocaleDateString().split("/"); // "dd/MM/yyyy"
  const formattedDate = `${splitDate[2]}-${splitDate[1]}-${splitDate[0]}`; // "yyyy-MM-dd"
  const [formData, setFormData] = useState<FormData>({
    date: formattedDate, // Get today's date in 'YYYY-MM-DD' format
  });

  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);

  // if there is user, add userId field to the form
  useEffect(() => {
    if (userId) {
      setFormData((prevState: any) => ({ ...prevState, userId: userId }));
    }
  }, [userId]);

  //   const fullCalendarRef = useRef(null);

  // Load events from localStorage on component mount
  //   useEffect(() => {
  //     const storedEvents = localStorage.getItem("calendarEvents");
  //     if (storedEvents) {
  //       setEvents(JSON.parse(storedEvents));
  //     }
  //   }, []);

  // console.log("MAIN PAGE TRANSACTIONS: ", transactions);
  if (transactions) {
    transactions.sort((a: any, b: any) => {
      const dateA: Date = new Date(a.date);
      const dateB: Date = new Date(b.date);

      // Reverse the comparison based on sort order
      return sortOrder === "asc"
        ? dateA.getTime() - dateB.getTime()
        : dateB.getTime() - dateA.getTime();
    });
  }

  // console.log("SOrted : ", transactions);

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // filter by month
  function filterTransactionsByMonth(transactions: any, selectedMonth: number) {
    const filteredTransactions = transactions?.filter(
      (transaction: { date: string | number | Date }) => {
        const transactionMonth = new Date(transaction.date).getMonth();
        return transactionMonth === selectedMonth;
      }
    );
    return filteredTransactions;
  }

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedMonthValue = event.target.value;
    const selectedMonth =
      selectedMonthValue !== "" ? parseInt(selectedMonthValue) : null; // Convert to null if empty string
    setSelectedMonth(selectedMonth);
  };

  // const filteredTransactions =
  //   selectedMonth !== null
  //     ? filterTransactionsByMonth(transactions, selectedMonth)
  //     : transactions;

  // to render relevant months in the dropdown
  const getUniqueMonths = (transactions: any[]) => {
    const uniqueMonths = new Set<number>();
    transactions.forEach((transaction: any) => {
      const month = new Date(transaction.date).getMonth();
      uniqueMonths.add(month);
    });
    return Array.from(uniqueMonths);
  };

  const uniqueMonths = transactions ? getUniqueMonths(transactions) : [];

  function getMonthName(month: number) {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return monthNames[month];
  }

  console.log("SELECTED MONTH: ", selectedMonth);

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
          formattedDate={formattedDate}
          userId={userId}
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

        <div className="flex justify-center">
          <div className="  w-1/2 p-10 flex flex-col justify-center items-center gap-3">
            <h2 className="text-2xl font-semibold text-center mb-6">
              My transactions
            </h2>
            <Button
              className="px-6 rounded-lg bg-blue-500 text-white font-semibold shadow-lg hover:bg-blue-600"
              variant="primary"
              onClick={() => {
                setAddModalShow(true);
              }}
            >
              Add
            </Button>
            <div className="w-full mt-8 flex flex-col gap-3">
              {selectedMonth !== null
                ? filterTransactionsByMonth(transactions, selectedMonth).map(
                    (transaction: { _id: any }) => (
                      <TransactionItem
                        key={transaction._id}
                        transaction={transaction}
                      />
                    )
                  )
                : transactions &&
                  transactions.map((transaction: { _id: any }) => (
                    <TransactionItem
                      key={transaction._id}
                      transaction={transaction}
                    />
                  ))}
            </div>
          </div>
          <div className="h-20 flex justify-between px-4 py-2 mx-auto space-x-4">
            <Container
              className="flex items-center cursor-pointer block border border-gray-300 rounded-md px-4"
              onClick={toggleSortOrder}
            >
              {sortOrder === "asc" ? "Sort by latest" : "Sort by oldest"}
            </Container>
            <select
              className="block border border-gray-300 rounded-md px-4"
              onChange={handleMonthChange}
              value={selectedMonth !== null ? selectedMonth.toString() : ""}
            >
              <option value="">All months</option>
              {uniqueMonths.map((month: number) => (
                <option key={month} value={month}>
                  {getMonthName(month)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </DataContext.Provider>
    </div>
  );
}

export default MainPage;
