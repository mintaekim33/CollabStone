import React, { useEffect, useState } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";

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

    const expenseData = Array.from(expenseMap).map(([category, amount]) => ({
      category,
      amount,
    }));
    const incomeData = Array.from(incomeMap).map(([category, amount]) => ({
      category,
      amount,
    }));

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

  return (
    <>
      <div className="flex justify-center pt-8">
        <div className="outline" style={{ width: 400 }}>
          <h2>Expense</h2>
          <PieChart width={400} height={400}>
            <Pie
              dataKey="amount"
              data={expenseData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {expenseData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  // fill={`#${index}${index}${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </div>
        <div className="outline" style={{ width: 400 }}>
          <h2>Income</h2>
          <PieChart width={400} height={400}>
            <Pie
              dataKey="amount"
              data={incomeData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {incomeData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={`#${index}${index}${index}`}
                />
              ))}
            </Pie>
          </PieChart>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
