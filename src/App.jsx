
import { useState } from 'react'
import './App.css'

function App() {
  // 2
 const [tasks,setTasks]= useState([]);
 const [inputValue,setInputValue]= useState('')

//  3
 const addTask=()=>{
  if(inputValue.trim()==='') return;

  const newTask={
    id:Date.now(),
    text:inputValue,
    completed:false,
    
  }
  
  setTasks([...tasks,newTask])
  setInputValue('')
  console.log(newTask)
 }

 // 5
   const deleteTask=(id)=>{
     console.log("Видаляємо задачу з id:", id);

    const updatedTasks=tasks.filter((task)=>task.id !==id)
    console.log("Старий масив:", tasks);
  console.log("Новий масив після filter:", updatedTasks);
  setTasks(updatedTasks);
   
  }
    const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };
   

  return (
    // 1
  <div className='app'>
    <h1 className='title'>My To-Do App</h1>
    <div className="input-wrapper">
      <input 
      type="text"
      // 4
      value={inputValue}
      onChange={(e)=>setInputValue(e.target.value)}
      // 
      placeholder='Введіть задачу...'
      className='task-input'
      />
      <button onClick={addTask} className='add-btn'>
         Додати
      </button>
      </div>
      {/* 5 */}
      <ul className="task-list">
        {tasks.map((task)=>(
          <li className='task-list-item'>
            <div className="task-left">
            <input type="checkbox"
            checked={task.completed}
            onChange={()=>toggleTask(task.id)}
             className="task-checkbox"
              />
            <span className={`task-text ${task.completed ? "completed" : ""}`}>
              {task.text}
              </span>
</div>
          {/* 5 */}
        <button className="delete-btn" onClick={()=>deleteTask(task.id)} >
            ✖  Видалити
            </button>
          </li>
        ))}
      </ul>
  </div>)
}

export default App
