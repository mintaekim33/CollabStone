import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
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
    <div className="">
      <Table striped bordered hover className="m-0">
        <tbody>
          <tr>
            <td className="w-1/5 text-center">{formattedDate}</td>
            <td className="w-1/5 text-center">
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
                  <FontAwesomeIcon
                    icon={faTicket}
                    style={{ color: "#FFD43B" }}
                  />
                )}
                {transaction.category === "Shopping" && (
                  <FontAwesomeIcon
                    icon={faBagShopping}
                    style={{ color: "d86518" }}
                  />
                )}
              </span>
              {transaction.category}
            </td>
            <td className="w-1/5 text-center">
              <p
                className={
                  transaction.type === "Income"
                    ? "text-green-600"
                    : "text-red-600 custom"
                }
              >
                <span>{transaction.type === "Income" ? "+" : "-"}</span>$
                {transaction.amount}
              </p>
            </td>
            <td className="w-1/5 text-center">{transaction.note}</td>
            <td className=" text-center">
              <Link to={"/transaction/" + transaction._id}>
                <FontAwesomeIcon icon={faPencil} style={{ color: "#0c0d0d" }} />
              </Link>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default TransactionItem;
