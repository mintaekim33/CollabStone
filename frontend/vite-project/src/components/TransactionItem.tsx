import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { PencilIcon } from "@heroicons/react/24/solid";

function TransactionItem(props: any) {
  const { transaction } = props;

  return (
    <>
      <Container>
        <Row
          className={`mx-20 p-10 rounded-md ${
            transaction.type == "Income" ? "bg-green-100" : "bg-red-100"
          } p-4 flex items-center justify-between`}
        >
          <Col className="flex-initial">{transaction.date?.split("T")[0]}</Col>
          <Col className="flex-initial">{transaction.type}</Col>
          <Col className="flex-initial">{transaction.category}</Col>
          <Col className="flex-initial">${transaction.amount}</Col>
          <Col>
            <Link to={"/transaction/" + transaction._id}>
              <PencilIcon className="w-6 text-sky-600" />
            </Link>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default TransactionItem;
