import { useState } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const navigation = [
  { name: "Product", href: "#" },
  { name: "Features", href: "#" },
  { name: "Marketplace", href: "#" },
  { name: "Company", href: "#" },
];

function Landing() {
  //   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div>
      <Container className="flex flex-col  items-center outline">
        <h2 className="outline m-24 p-10">
          Start your journey towards better money management today
        </h2>
        <h5 className="outline mb-24 p-10">
          Empower yourself with knowledge. Our app provides actionable insights
          into your spending habits, helping you identify areas for improvement
          and make smarter financial choices. Join thousands of users who have
          taken control of their finances with our app. Start your journey
          towards financial success today.
        </h5>
        <Link to="/signup" className="outline rounded mb-24 p-3">
          Get Started
        </Link>
      </Container>
    </div>
  );
}

export default Landing;
