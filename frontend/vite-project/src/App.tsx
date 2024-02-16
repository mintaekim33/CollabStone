import { Route, Routes } from "react-router-dom";
import "./App.css";
import CreatePriorityForm from "./components/CreatePriorityForm";
import { useState } from "react";
import { Button } from "react-bootstrap";
import AddPriority from "./components/AddPriority";

function App() {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Launch vertically centered modal
      </Button>
      <AddPriority show={modalShow} onHide={() => setModalShow(false)} />
      <div>
        <Routes>
          <Route path="/add" element={<CreatePriorityForm />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
