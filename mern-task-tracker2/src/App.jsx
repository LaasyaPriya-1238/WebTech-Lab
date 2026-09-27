import { useEffect, useState } from "react";
import "./App.css";

function App() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [subject, setSubject] = useState("");
    const [priority, setPriority] = useState("Medium");
    const [filter, setFilter] = useState("All");
    const [editingTask, setEditingTask] = useState(null);
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        fetch("http://localhost:5000/api/tasks")
            .then((response) => response.json())
            .then((data) => setTasks(data))
            .catch((error) => console.log(error));
    }, []);

    const addTask = async (e) => {
        e.preventDefault();

        if (!title || !subject) {
            alert("Please enter task and subject");
            return;
        }

        const newTask = {
            title,
            subject,
            priority
        };

        const response = await fetch("http://localhost:5000/api/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newTask)
        });

        const savedTask = await response.json();

        setTasks([savedTask, ...tasks]);

        setTitle("");
        setSubject("");
        setPriority("Medium");
    };

    const completeTask = async (id) => {
    const response = await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ status: "Completed" })
    });

    const updatedTask = await response.json();

    setTasks(
        tasks.map((task) =>
            task._id === id ? updatedTask : task
        )
    );
};

  const editTask = (task) => {
    setEditingTask(task);
    setTitle(task.title);
    setSubject(task.subject);
    setPriority(task.priority);
};

const updateTask = async (e) => {
    e.preventDefault();

    const updatedData = {
        title,
        subject,
        priority
    };

    const response = await fetch(
        `http://localhost:5000/api/tasks/${editingTask._id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedData)
        }
    );

    const updatedTask = await response.json();

    setTasks(
        tasks.map((task) =>
            task._id === editingTask._id ? updatedTask : task
        )
    );

    setEditingTask(null);
    setTitle("");
    setSubject("");
    setPriority("Medium");
};

const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: "DELETE"
    });

    setTasks(
        tasks.filter((task) => task._id !== id)
    );
};

const filteredTasks = tasks.filter((task) => {
    if (filter === "All") {
        return true;
    }

    if (filter === "Completed") {
        return task.status === "Completed";
    }

    if (filter === "Pending") {
        return task.status === "Pending";
    }

    if (filter === "High") {
        return task.priority === "High";
    }
});

const totalTasks = tasks.length;

const pendingTasks = tasks.filter(
    (task) => task.status === "Pending"
).length;

const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
).length;

const highPriorityTasks = tasks.filter(
    (task) => task.priority === "High"
).length;

return (
    <div className={darkMode ? "app dark" : "app"}>
        <div className="container">

          <header className="header">
                <div>
                    <p className="small-title">MY STUDY SPACE</p>
                    <h1>Student Task Tracker</h1>
                    <p className="subtitle">
                        Keep your assignments and study tasks organized.
                    </p>
                </div>

                <div className="header-actions">
                    <button
                        className="theme-toggle"
                        onClick={() => setDarkMode(!darkMode)}
                    >
                        {darkMode ? "☀ Light" : "☾ Dark"}
                    </button>

                    <div className="task-summary">
                        <span>{totalTasks}</span>
                        <small>Total Tasks</small>
                    </div>
                </div>
            </header>

            <div className="dashboard">
                  <div className="dashboard-card total">
                      <span>{totalTasks}</span>
                      <p>Total Tasks</p>
                  </div>

                  <div className="dashboard-card pending">
                      <span>{pendingTasks}</span>
                      <p>Pending</p>
                  </div>

                  <div className="dashboard-card completed">
                      <span>{completedTasks}</span>
                      <p>Completed</p>
                  </div>

                  <div className="dashboard-card high">
                      <span>{highPriorityTasks}</span>
                      <p>High Priority</p>
                  </div>
              </div>

            <section className="task-form-card">
                <h2>{editingTask ? "Edit Task" : "Add a New Task"}</h2>

                <form onSubmit={editingTask ? updateTask : addTask}>

                    <div className="input-group">
                        <label>Task</label>
                        <input
                            type="text"
                            placeholder="e.g. Complete DBMS assignment"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <label>Subject</label>
                        <input
                            type="text"
                            placeholder="e.g. Data Science"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <label>Priority</label>
                        <select
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                        >
                            <option>Low</option>
                            <option>Medium</option>
                            <option>High</option>
                        </select>
                    </div>

                    <button className="main-btn" type="submit">
                        {editingTask ? "Update Task" : "Add Task"}
                    </button>

                    {editingTask && (
                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={() => {
                                setEditingTask(null);
                                setTitle("");
                                setSubject("");
                                setPriority("Medium");
                            }}
                        >
                            Cancel
                        </button>
                    )}

                </form>
            </section>

            <section className="filter-section">

                <div className="section-heading">
                    <h2>Your Tasks</h2>
                    <span>{filteredTasks.length} shown</span>
                </div>

                <div className="filters">

                    <button
                        className={filter === "All" ? "filter-btn active all" : "filter-btn"}
                        onClick={() => setFilter("All")}
                    >
                        All
                    </button>

                    <button
                        className={filter === "Pending" ? "filter-btn active pending" : "filter-btn"}
                        onClick={() => setFilter("Pending")}
                    >
                        Pending
                    </button>

                    <button
                        className={filter === "Completed" ? "filter-btn active completed" : "filter-btn"}
                        onClick={() => setFilter("Completed")}
                    >
                        Completed
                    </button>

                    <button
                        className={filter === "High" ? "filter-btn active high" : "filter-btn"}
                        onClick={() => setFilter("High")}
                    >
                        High Priority
                    </button>

                </div>
            </section>

            <section className="task-list">

                {filteredTasks.length === 0 ? (
                    <div className="empty-state">
                        <h3>No tasks here</h3>
                        <p>
                            Add a new task or choose another filter.
                        </p>
                    </div>
                ) : (
                    filteredTasks.map((task) => (

                        <div
                            className={`task-card ${task.status === "Completed" ? "completed-card" : ""}`}
                            key={task._id}
                        >

                            <div className="task-content">

                                <div className="task-top">
                                    <h3>{task.title}</h3>

                                    <span
                                        className={`priority ${task.priority.toLowerCase()}`}
                                    >
                                        {task.priority}
                                    </span>
                                </div>

                                <p className="subject">
                                    {task.subject}
                                </p>

                                <span
                                    className={`status ${task.status.toLowerCase()}`}
                                >
                                    {task.status}
                                </span>

                            </div>

                            <div className="task-actions">

                                <button
                                    className="edit-btn"
                                    onClick={() => editTask(task)}
                                >
                                    Edit
                                </button>

                                {task.status !== "Completed" && (
                                    <button
                                        className="complete-btn"
                                        onClick={() => completeTask(task._id)}
                                    >
                                        Complete
                                    </button>
                                )}

                                <button
                                    className="delete-btn"
                                    onClick={() => deleteTask(task._id)}
                                >
                                    Delete
                                </button>

                            </div>

                        </div>

                    ))
                )}

            </section>

        </div>
    </div>
);

}
export default App;
