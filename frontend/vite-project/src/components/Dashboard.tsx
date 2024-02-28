import React, { useEffect, useState } from "react";
import { PieChart, Pie, Sector, Cell } from "recharts";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Card, ListGroup } from "react-bootstrap";

function Dashboard(props: any) {
  const { transactions } = props;

  const [expenseData, setExpenseData] = useState<any[]>([]);
  const [incomeData, setIncomeData] = useState<any[]>([]);

  // Calculate expense and income data
  useEffect(() => {
    const expenseMap = new Map<string, number>();
    const incomeMap = new Map<string, number>();

    if (transactions) {
      transactions.forEach((transaction: any) => {
        if (transaction.type === "Expense") {
          expenseMap.set(
            transaction.category,
            (expenseMap.get(transaction.category) || 0) + transaction.amount
          );
        } else if (transaction.type === "Income") {
          incomeMap.set(
            transaction.category,
            (incomeMap.get(transaction.category) || 0) + transaction.amount
          );
        }
      });
    }

    // Expense Map
    //  [
    //     ["Food", 80],      // Total expenses for Food category: 80
    //     ["Shopping", 100], // Total expenses for Shopping category: 100
    //  ]

    const expenseData = Array.from(expenseMap).map(([category, amount]) => ({
      category,
      amount,
    }));
    const incomeData = Array.from(incomeMap).map(([category, amount]) => ({
      category,
      amount,
    }));

    // Expense data
    // [
    //   { category: "Food", amount: 80 },
    //   { category: "Shopping", amount: 100 }
    // ]

    setExpenseData(expenseData);
    setIncomeData(incomeData);
  }, [transactions]);

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#AF19FF",
    "#A3A3A3",
  ];

  const totalExpense = expenseData.reduce(
    (total, entry) => total + entry.amount,
    0
  );
  const totalIncome = incomeData.reduce(
    (total, entry) => total + entry.amount,
    0
  );
  const balance = totalIncome - totalExpense;

  interface MonthlyTotals {
    [key: number]: {
      monthName: string;
      expenses: number;
      income: number;
    };
  }

  // Function to calculate total expenses and income for each month
  const calculateMonthlyTotals = () => {
    const monthlyTotals: MonthlyTotals = {};

    // Loop through transactions to calculate totals for each month
    transactions.forEach((transaction: any) => {
      const date = new Date(transaction.date);
      const month = date.getMonth() + 1; // Months are 0-indexed, so add 1

      // Initialize totals object for the month if it doesn't exist
      if (!monthlyTotals[month]) {
        monthlyTotals[month] = {
          monthName: date.toLocaleString("default", { month: "short" }),
          expenses: 0,
          income: 0,
        };
      }

      // Update totals based on transaction type (assuming 'expense' and 'income' fields)
      if (transaction.type === "Expense") {
        monthlyTotals[month].expenses += transaction.amount;
      } else if (transaction.type === "Income") {
        monthlyTotals[month].income += transaction.amount;
      }
    });

    // Convert object into array of objects for each month
    return Object.values(monthlyTotals);
  };

  // Calculate monthly totals
  const monthlyTotals = calculateMonthlyTotals();

  return (
    <>
      <div className="flex justify-center">
        <Card
          className="w-75 mt-10 flex justify-center items-center"
          style={{ height: "50px" }}
        >
          <Row className=" w-3/4 h-1/2">
            <Col>Total Expenses: {totalExpense}</Col>
            <Col>Total Income: {totalIncome}</Col>
            <Col>Balance: {balance} </Col>
          </Row>
        </Card>
      </div>

      <div className="flex justify-center">
        <Card className="w-50 mt-10">
          <Card.Body>
            <Card.Title>Overview</Card.Title>
            <ListGroup variant="flush">
              <ListGroup.Item>Total Expenses: {totalExpense}</ListGroup.Item>
              <ListGroup.Item>Total Income: {totalIncome}</ListGroup.Item>
              <ListGroup.Item>Balance: {balance}</ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
      </div>

      <div className="flex justify-center pt-8">
        <Card className="" style={{ width: 500 }}>
          <h3 className="flex justify-center">Expense by Category</h3>
          <PieChart width={500} height={500}>
            <Pie
              dataKey="amount"
              data={expenseData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label={({ category, amount }) => `${category}: $${amount}`}
            >
              {expenseData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </Card>
        <Card className="" style={{ width: 500 }}>
          <h3 className="flex justify-center">Income by Category</h3>
          <PieChart width={500} height={500}>
            <Pie
              dataKey="amount"
              data={incomeData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label={({ category, amount }) => `${category}: $${amount}`}
            >
              {incomeData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </Card>
      </div>

      {/* bar chart of expenses and income every month */}
      <div className="flex justify-center my-20">
        <Card className="w-1/2 flex justify-center items-center">
          <h3 className="flex justify-center">Monthly Data</h3>
          <BarChart width={500} height={300} data={monthlyTotals}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="monthName" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="expenses" fill="#c7231e" name="Expenses" />
            <Bar dataKey="income" fill="#54ad3b" name="Income" />
          </BarChart>
        </Card>
      </div>
    </>
  );
}

export default Dashboard;
