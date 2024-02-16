import { useState } from "react";

// define structure for FormData type
interface FormData {
  title?: string;
  description?: string;
}

function CreatePriorityForm() {
  const [formData, setFormData] = useState<FormData>({});
  const [deadline, setDeadline] = useState("");

  return (
    <form>
      <label>Title</label>
      <input
        value={formData.title || ""}
        onChange={(e) => {
          // console.log(e.target.value);
          setFormData({
            ...formData,
            title: e.target.value,
          });
          // console.log("form data: ", formData);
        }}
      />
      <label>Description</label>
      <input
        value={formData.description || ""}
        onChange={(e) => {
          // console.log(e.target.value);
          setFormData({
            ...formData,
            description: e.target.value,
          });
          // console.log("form data: ", formData);
        }}
      />

      <label>Category</label>
      {/* use select options */}
      <select>
        <option>work</option>
        <option>home</option>
        <option>fun</option>
      </select>

      <label>Deadline</label>
      {/* use calendar picker */}
      <input
        type="date"
        value={deadline}
        placeholder="DD/MM/YY"
        onChange={(e) => {
          setDeadline(e.target.value);
          console.log("due: ", deadline);
        }}
      />
    </form>
  );
}

export default CreatePriorityForm;
