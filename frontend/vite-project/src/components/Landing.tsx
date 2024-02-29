import { Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

function Landing() {
  const data = [
    { category: "Category 1", amount: 200 },
    { category: "Category 2", amount: 300 },
    { category: "Category 3", amount: 400 },
    { category: "Category 4", amount: 150 },
    { category: "Category 5", amount: 500 },
  ];

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#AF19FF",
    "#A3A3A3",
  ];

  const monthlyData = [
    { monthName: "January", expenses: 1000, income: 1500 },
    { monthName: "February", expenses: 1200, income: 1600 },
    { monthName: "March", expenses: 1100, income: 1700 },
    { monthName: "April", expenses: 1300, income: 1800 },
    { monthName: "May", expenses: 900, income: 1400 },
    { monthName: "June", expenses: 950, income: 1450 },
  ];

  return (
    <>
      {/* Hero Section */}
      <div className="bg-image text-stone-800 py-20">
        <Container className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Take Control of Your Finances
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Empower yourself with our intuitive financial management app. Start
            making smarter money decisions today!
          </p>
          <Link
            to="/signup"
            className="bg-slate-300 text-stone-800 no-underline font-semibold py-3 px-6 rounded-lg hover:bg-blue-300  transition duration-300"
          >
            Get Started
          </Link>
        </Container>
      </div>

      {/* Features Section */}
      <Container className="my-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <Card.Body className="text-center">
              <h3 className="text-xl font-semibold mb-4">Expense Tracking</h3>
              <p>
                Effortlessly track your expenses and analyze your spending
                patterns with our intuitive interface.
              </p>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body className="text-center">
              <h3 className="text-xl font-semibold mb-4">Budget Planning</h3>
              <p>
                Create customized budgets and stay on track with your financial
                goals.
              </p>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body className="text-center">
              <h3 className="text-xl font-semibold mb-4">Visual Reports</h3>
              <p>
                Visualize your financial data with beautiful charts and graphs
                for better insights.
              </p>
            </Card.Body>
          </Card>
        </div>
      </Container>

      {/* Charts Section */}
      <Container className="my-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
          Visualize Your Money Flow
        </h2>
        <div className="flex justify-center space-x-10">
          <Card style={{ width: 500 }}>
            <Card.Body>
              <h3 className="text-xl font-semibold mb-4 text-center">
                Spending Distribution
              </h3>
              <PieChart width={500} height={300}>
                <Pie
                  dataKey="amount"
                  data={data}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ category, amount }) => `${category}: $${amount}`}
                >
                  {data.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </Card.Body>
          </Card>
          <Card style={{ width: 500 }}>
            <Card.Body>
              <h3 className="text-xl font-semibold mb-4 text-center">
                Monthly Summary
              </h3>
              <BarChart width={500} height={300} data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="monthName" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="expenses" fill="#c7231e" name="Expenses" />
                <Bar dataKey="income" fill="#54ad3b" name="Income" />
              </BarChart>
            </Card.Body>
          </Card>
        </div>
      </Container>

      {/* Call to Action */}
      <div className="bg-gray-200 py-20 text-center">
        <Container>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Take Control of Your Finances?
          </h2>
          <p className="text-lg md:text-xl mb-8">
            Sign up now and start managing your money with ease.
          </p>
          <Link
            to="/signup"
            className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Sign Up
          </Link>
        </Container>
      </div>
    </>
  );
}

export default Landing;
