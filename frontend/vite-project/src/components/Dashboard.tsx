import React, { useEffect, useState } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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

  return (
    <>
      <Container className="outline flex justify-center items-center h-20">
        <Row className="outline w-3/4 h-1/2">
          <Col>Total Expenses: {totalExpense}</Col>
          <Col>Total Income: {totalIncome}</Col>
          <Col>Balance: {balance} </Col>
        </Row>
      </Container>
      <div className="flex justify-center pt-8">
        <div className="outline" style={{ width: 500 }}>
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
        </div>
        <div className="outline" style={{ width: 500 }}>
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
        </div>
      </div>

      {/* bar chart of expenses and income every month */}
    </>
  );
}

export default Dashboard;
