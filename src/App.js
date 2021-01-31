import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import About from './components/About';

function App() {

  const [tasks, setTasks] = useState([])

  const [showAddTask, setShowAddTask] = useState(false)

  useEffect(() => {
    const getTasks = async () => {
      const tasks = await fetchTasks();
      setTasks(tasks)
    }

    getTasks()
  }, [])

  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data
  }

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data
  }

  // Add Task
  const addTask = async (task) => {
    // const id = Math.floor(Math.random() * 10000)
    // const newTask = { id, ...task }
    const res = await fetch(`http://localhost:5000/tasks`, {
      method: 'POST',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(task)
    })

    const data = await res.json()

    setTasks([...tasks, data])
  }

  // Delete Task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    })
    setTasks(tasks.filter((task) => task.id !== id))
  }

  // ToggleReminder
  const toggleReminder = async (id) => {
    const taskToUpdate = await fetchTask(id)
    const updatedTask = { ...taskToUpdate, reminder: !taskToUpdate.reminder }
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        "Content-type": 'application/json'
      },
      body: JSON.stringify(updatedTask)
    })
    const data = await res.json()
    setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: data.reminder } : task))
  }

  return (
    <Router>
      <div className="container">
        <Header onAdd={() => setShowAddTask(!showAddTask)} showAddTask={showAddTask} />
        {showAddTask && <AddTask onAdd={addTask} />}

        <Route path='/' exact render={() => (
          <>
            {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} /> : 'No Tasks to show'}
          </>
        )} />
        <Route path='/about' component={About} />
        <Footer />

      </div>

    </Router>

  );
}

export default App;
