import { useState, useEffect } from "react";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AxiosCancelableRequest } from "./helpers/axios-cancellable-request";


function App() {
  /**
   * The variables in useState data are immutable
   * So we cant use tasks.push()
   * Instead we can use the setTasks() function to set new tasks
   * The value we pass on to the setTasks function will replace the old value.
   * Hence mutation is achieved
   */
  const [tasks, setTasks] = useState([]);
  const [showAddTask, setShowAddTask] = useState(false);

  /**
   * useEffect is ideally used to load something or perform some operation right after the page loads
   * It takes in 2 parameters, 1st is the function logic defined by the user
   * 2nd is the dependencies.
   * Here since the dependencies array is empty, the useEffect will only be triggered during a page reload
   * Incase if we pass in a dependency variable like `showAddTask` for instance, then the useEffect will also listen
   * to the changes that happen to this variable and then will call the callback function
   */

  /**
   * Ideally as per the axios example below
   * Whenever we make an API call, if the user redirects to another page or so
   * We should prevent the API call from finishing and rendering the component
   * Therefore, we should use the below logic to implement a cleanup logic for the useEffect
   * So the cleanup logic will abort the api calls and prevent the components from loading into the page
   * It can remove setInterval() type of event listeners etc..
   * This can help prevent memory leakage
   */
  useEffect(() => {
    const axiosInstance = new AxiosCancelableRequest();
    const apiUrl = "http://localhost:9000/tasks";

    const fetchData = async () => {
      try {
        const data = await axiosInstance.makeRequest(apiUrl);
        setTasks(data);
      } catch (error) {
        // Handle error if needed
      }
    };

    fetchData();

    // Cleanup function for useEffect
    return () => {
      axiosInstance.cancelRequest("Request canceled by useEffect cleanup");
    };
  }, []);

  //Fetch task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:9000/tasks/${id}`);
    const data = await res.json();
    return data;
  };

  // Add task
  const addTask = async (task) => {
    const res = await fetch("http://localhost:9000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });

    const data = await res.json();

    setTasks([...tasks, data]);
    // const id = Math.floor(Math.random() * 10000) + 1;
    // const newTask = { id, ...task };
    // setTasks([...tasks, newTask]);
  };

  // Delete a task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:9000/tasks/${id}`, {
      method: "DELETE",
    });
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Toggle reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

    const res = await fetch(`http://localhost:9000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updTask),
    });

    const data = await res.json();

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    );
  };

  return (
    <Router>
      <div className="container">
        <Header
          onAdd={() => setShowAddTask(!showAddTask)}
          showingAddTask={showAddTask}
        />
        <Routes>
          <Route
            path="/"
            element={
              <>
                {showAddTask && <AddTask onAdd={addTask} />}
                {tasks.length > 0 ? (
                  <Tasks
                    tasks={tasks}
                    onDelete={deleteTask}
                    onToggle={toggleReminder}
                  />
                ) : (
                  "No Tasks To Show"
                )}
              </>
            }
          />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
