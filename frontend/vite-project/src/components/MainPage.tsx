import "../App.css";
import { useEffect, useState, createContext } from "react";
import AddTransaction from "./AddTransaction";
import TransactionTable from "./TransactionTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

// define structure for FormData type
interface FormData {
  date?: string;
  type?: string;
  category?: string;
  amount?: number;
  note?: string;
}

// create context for transaction data
export const DataContext = createContext<any>(null);

function MainPage(props: any) {
  const { userId, transactions, setTransactions } = props;
  const [addModalShow, setAddModalShow] = useState(false);

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

  return (
    <div className="">
      <DataContext.Provider value={{ transactions, setTransactions }}>
        <AddTransaction
          show={addModalShow}
          onHide={() => setAddModalShow(false)}
          transactions={transactions}
          setTransactions={setTransactions}
          formData={formData}
          setFormData={setFormData}
          formattedDate={formattedDate}
          userId={userId}
        />

        <div className="flex justify-center w-full pt-12 ">
          <div className="flex flex-col w-full items-center ">
            <div className="flex items-center justify-between space-x-4 mb-4">
              <h2 className=" flex  justify-center text-2xl font-semibold">
                My transactions
              </h2>
              <FontAwesomeIcon
                icon={faPlus}
                className="  bg-blue-100 border border-gray-900	hover:bg-blue-300 cursor-pointer p-1 rounded-full"
                onClick={() => {
                  setAddModalShow(true);
                }}
              />
              <button
                className="focus:outline-none cursor-pointer block border border-gray-500 rounded-md px-4 py-2"
                onClick={toggleSortOrder}
              >
                {sortOrder === "asc" ? "Sort by latest" : "Sort by oldest"}
              </button>
              <select
                className="focus:outline-none focus:shadow-outline border border-gray-300 rounded-md px-4 py-2"
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
            <div className=" w-full flex justify-center">
              <TransactionTable
                className="w-full"
                selectedMonth={selectedMonth}
                filterTransactionsByMonth={filterTransactionsByMonth}
                transactions={transactions}
              />
            </div>
          </div>
        </div>
      </DataContext.Provider>
    </div>
  );
}

export default MainPage;
