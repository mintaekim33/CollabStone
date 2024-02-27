import "../App.css";
import { useEffect, useState, createContext } from "react";
import { Button, Container } from "react-bootstrap";
import AddTransaction from "./AddTransaction";
import TransactionItem from "./TransactionItem";
import TransactionTable from "./TransactionTable";

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

        <div className="flex justify-center">
          <div className="outline flex flex-col items-center">
            <div className="flex justify-around items-center w-full">
              <h2 className="text-2xl font-semibold">My transactions</h2>
              <button
                className="px-2 py-1 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600"
                onClick={() => {
                  setAddModalShow(true);
                }}
              >
                Add
              </button>
            </div>
            <div className="mt-2">
              <TransactionTable
                selectedMonth={selectedMonth}
                filterTransactionsByMonth={filterTransactionsByMonth}
                transactions={transactions}
              />
            </div>
          </div>
          <div className="outline flex flex-col justify-center items-center ml-4">
            <div
              className=" cursor-pointer block border border-gray-300 rounded-md px-4 py-2 mb-2"
              onClick={toggleSortOrder}
            >
              {sortOrder === "asc" ? "Sort by latest" : "Sort by oldest"}
            </div>
            <select
              className="block border border-gray-300 rounded-md px-4 py-2"
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
