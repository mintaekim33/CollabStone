import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="bg-image">
      <Container className="flex flex-col  items-center justify-center h-screen text-center text-white">
        <h2 className=" text-3xl md:text-4xl lg:text-5xl font-bold mb-8">
          Start your journey towards better money management today
        </h2>
        <h5 className=" text-lg md:text-xl lg:text-2xl mb-8">
          Empower yourself with knowledge. Our app provides actionable insights
          into your spending habits, helping you identify areas for improvement
          and make smarter financial choices. Join thousands of users who have
          taken control of their finances with our app. Start your journey
          towards financial success today.
        </h5>
        <Link
          to="/signup"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
        >
          Get Started
        </Link>
      </Container>
    </div>
  );
}

export default Landing;
