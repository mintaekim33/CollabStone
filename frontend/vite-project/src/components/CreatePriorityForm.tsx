import { useState } from "react";
import { submitPriority } from "../service/priorities";

// define structure for FormData type
interface FormData {
  title?: string;
  description?: string;
  category?: string;
  deadline?: string;
}

function CreatePriorityForm() {
  const [formData, setFormData] = useState<FormData>({});

  async function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();
    console.log("FORM: ", formData);

    try {
      const response = await submitPriority(formData);
      console.log("form response: ", response);
    } catch (e) {
      console.log("Error submitting", e);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
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
      <div>title: {formData.title}</div>

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
      <div>desc: {formData.description}</div>

      <label>Category</label>
      {/* use select options */}
      <select
        value={formData.category || ""}
        onChange={(e) => {
          setFormData({
            ...formData,
            category: e.target.value,
          });
          console.log("category: ", formData.category);
        }}
      >
        <option>work</option>
        <option>home</option>
        <option>fun</option>
      </select>

      <div>category: {formData.category}</div>

      <label>Deadline</label>
      {/* use calendar picker */}
      <input
        type="date"
        value={formData.deadline || ""}
        placeholder="DD/MM/YY"
        onChange={(e) => {
          setFormData({
            ...formData,
            deadline: e.target.value,
          });
          console.log("due: ", formData.deadline);
        }}
      />
      <div>deadline: {formData.deadline}</div>

      <button type="submit">Submit</button>
    </form>
  );
}

export default CreatePriorityForm;
