import { Route, Routes } from "react-router-dom";
import "./App.css";
import CreatePriorityForm from "./components/CreatePriorityForm";

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/add" element={<CreatePriorityForm />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
