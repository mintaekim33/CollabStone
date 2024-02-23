import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "react-bootstrap";

function TransactionItem(props: any) {
  const { transaction } = props;

  return (
    <>
      <Container className="mx-40 my-10 p-10  gap-3 bg-gray-100 p-4 rounded-md">
        <Row
          className={`mx-20 my-10 p-10 flex gap-3 ${
            transaction.type == "Income" ? "bg-green-100" : "bg-red-100"
          } p-4 rounded-md`}
        >
          <Col className="w-1/4">{transaction.date?.split("T")[0]}</Col>
          <Col className="w-1/4">{transaction.type}</Col>
          <Col className="w-1/4">{transaction.category}</Col>
          <Col className="w-1/4">${transaction.amount}</Col>
          <Col>
            <Link to={"/transaction/" + transaction._id}>
              <Button
                variant="primary"
                type="submit"
                value="Submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Edit a transaction
              </Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default TransactionItem;
