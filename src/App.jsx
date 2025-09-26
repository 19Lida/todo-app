import { useEffect, useState } from "react";
import "./App.css";
import TaskInput from "./components/TaskInput/TaskInput";

function App() {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text) => {
    if (!text.trim() === "") return;
    setTasks([...tasks, { id: Date.now(), text, completed: false }]);
    console.log("додаємо задачу", text);
  };
  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    console.log("Видаляємо задачу з id:", id);
  };
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsModalOpen(false);
      }
    };
    if (isModalOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen]);

  return (
    <div className="app">
      <h1 className="title">My To-Do App</h1>
      <button className="clear-btn" onClick={() => setIsModalOpen(true)}>
        Очистити список
      </button>
      <TaskInput onAdd={addTask} />
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className="task-list-item">
            <div className="task-left">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                className="task-checkbox"
              />
              <span
                className={`task-text ${task.completed ? "completed" : ""}`}
              >
                {task.text}
              </span>
            </div>

            <button className="delete-btn" onClick={() => deleteTask(task.id)}>
              ✖ Видалити
            </button>
          </li>
        ))}
      </ul>
      {/* Модалка */}
      {isModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsModalOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <p role="alert">Точно видалити всі задачі? 😱</p>
            <div className="modal-buttons">
              <button
                type="button"
                className="confirm-btn"
                aria-label="Підтвердити видалення всіх задач"
                onClick={() => {
                  setTasks([]);
                  setIsModalOpen(false);
                }}
              >
                ✅ Так
              </button>
              <button
                type="button"
                className="cancel-btn"
                aria-label="Скасувати видалення"
                onClick={() => setIsModalOpen(false)}
              >
                ❌ Ні
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
