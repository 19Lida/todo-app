import { useState } from "react";

const TaskInput = ({ onAdd }) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(value);
    setValue("");
  };

  return (
    <form className="input-wrapper" onSubmit={handleSubmit}>
      <label htmlFor="task-input" className="visually-hidden"></label>
      <input
        id="task-input"
        type="text"
        placeholder="Введи задачу..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="task-input"
      />
      <button className="add-btn" type="submit">
        Додати
      </button>
    </form>
  );
};
export default TaskInput;
