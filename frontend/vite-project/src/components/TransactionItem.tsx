import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBagShopping,
  faCreditCard,
  faPencil,
  faSackDollar,
  faTicket,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";

function TransactionItem(props: any) {
  const { transaction } = props;

  const formattedDate = new Date(
    transaction.date?.split("T")[0]
  ).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <>
      <Container>
        <Card
          className={`mx-20 p-10 rounded-md ${
            transaction.type == "Income" ? "bg-green-100" : "bg-red-100"
          } p-4 flex items-center justify-between`}
        >
          <Card.Text className="">{formattedDate}</Card.Text>
          <Card.Text className="">
            <span className="mr-1">
              {transaction.category === "Salary" && (
                <FontAwesomeIcon
                  icon={faCreditCard}
                  style={{ color: "#9a0e23" }}
                />
              )}
              {transaction.category === "Investment" && (
                <FontAwesomeIcon
                  icon={faSackDollar}
                  style={{ color: "#307e66" }}
                />
              )}
              {transaction.category === "Food" && (
                <FontAwesomeIcon
                  icon={faUtensils}
                  style={{ color: "#acaaaa" }}
                />
              )}
              {transaction.category === "Entertainment" && (
                <FontAwesomeIcon icon={faTicket} style={{ color: "#FFD43B" }} />
              )}
              {transaction.category === "Shopping" && (
                <FontAwesomeIcon
                  icon={faBagShopping}
                  style={{ color: "d86518" }}
                />
              )}
            </span>
            {transaction.category}
          </Card.Text>
          <Card.Text
            className={` ${
              transaction.type == "Income" ? "text-green-600" : "text-red-600"
            } `}
          >
            <span>{transaction.type === "Income" ? "+" : "-"}</span>$
            {transaction.amount}
          </Card.Text>
          <Card.Text>
            <Link to={"/transaction/" + transaction._id}>
              <FontAwesomeIcon icon={faPencil} style={{ color: "#0c0d0d" }} />
            </Link>
          </Card.Text>
        </Card>
      </Container>
    </>
  );
}

export default TransactionItem;
