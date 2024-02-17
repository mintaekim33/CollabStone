import { Route, Routes } from "react-router-dom";
import "./App.css";
import { useState } from "react";
import { Button } from "react-bootstrap";
import AddExpense from "./components/AddExpense";

function App() {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <div className="flex justify-center align-center bg-red-300">
        <Button
          className=""
          variant="primary"
          onClick={() => setModalShow(true)}
        >
          Add an expense
        </Button>
      </div>
      <AddExpense show={modalShow} onHide={() => setModalShow(false)} />
      <div>
        {/* <Routes>
          <Route path="/add" element={<CreatePriorityForm />} />
        </Routes> */}
      </div>
    </>
  );
}

export default App;
