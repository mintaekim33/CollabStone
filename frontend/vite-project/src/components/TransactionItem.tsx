import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBagShopping,
  faBus,
  faClock,
  faCreditCard,
  faPencil,
  faSackDollar,
  faTicket,
  faUtensils,
  faWifi,
} from "@fortawesome/free-solid-svg-icons";
import { getIcons } from "../util/icons";

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
            <td className="w-32 text-center">{formattedDate}</td>
            <td className="w-44 text-center">
              <span className="mr-1">{getIcons(transaction.category)}</span>
              {transaction.category}
            </td>
            <td className="w-20 text-center">
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
            <td className="w-32 text-center">{transaction.note}</td>
            <td className="w-16 text-center">
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
