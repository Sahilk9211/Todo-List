import React, { useEffect, useState } from "react";
import TaskList from "./Components/TaskList";
import { v4 as uuidv4 } from "uuid";

const App = () => {
  const [activity, setActivity] = useState("");
  const [task, setTask] = useState([]);
  const [update, setUpdate] = useState(true);
  const [edit, setEdit] = useState(null);

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const taskString = localStorage.getItem("task");
    if (taskString) {
      const task = JSON.parse(taskString);
      setTask(task);
    }
  }, []);

  // Save task to localStorage
  const saveTask = (updatedTask) => {
    localStorage.setItem("task", JSON.stringify(updatedTask));
  };

  const handleChange = (e) => {
    setActivity(e.target.value);
  };

  // Handle Add and Update Task
  const handleAddOrUpdate = () => {
    if (activity === "") {
      alert("Please enter a task");
      return;
    }

    if (!update) {
      // Updating an existing task
      const updatedTasks = task.map((item) => {
        if (item.id === edit) {
          return { ...item, title: activity };
        }
        return item;
      });

      setTask(updatedTasks);
      saveTask(updatedTasks); // Save after updating
      setUpdate(true);
      setActivity("");
      setEdit(null);
    } else {
      // Adding a new task
      const newTask = { id: uuidv4(), title: activity, complete: false };
      const updatedTasks = [...task, newTask];
      setTask(updatedTasks);
      saveTask(updatedTasks); // Save after adding
      setActivity("");
    }
  };

  // Handle Task Deletion
  const handleDelete = (id) => {
    const updatedTasks = task.filter((item) => item.id !== id);
    setTask(updatedTasks);
    saveTask(updatedTasks); // Save after deletion
  };

  return (
    <>
      <div className="min-h-screen flex justify-center bg-gradient-to-r from-[rgb(71,118,230)] to-[#8E54E9]">
        <div className="w-full min-h-full max-w-xl bg-white/20 backdrop-blur-lg rounded-xl p-8 my-16">
          <h2 className="text-center text-white text-3xl font-bold mb-6">
            Manage your todos at one place
          </h2>

          <h3 className="text-2xl font-semibold text-white mb-2">
            Add a Todo*
          </h3>

          <div className="flex justify-center items-center gap-2">
            <input
              type="text"
              onChange={handleChange}
              value={activity}
              className="font-semibold focus:text-[16px] w-full py-1 px-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7b31f3] transition duration-200 ease-in-out "
            />

            {update ? (
              <button
                onClick={handleAddOrUpdate}
                className="font-semibold text-[16px] px-5 py-1 mx-auto rounded-xl bg-[#7b31f3] text-white transition duration-200 ease-in-out hover:bg-[#8d47fd] hover:scale-105 active:scale-100"
              >
                Save
              </button>
            ) : (
              <button
                onClick={handleAddOrUpdate}
                className="font-semibold text-[16px] px-5 py-1 mx-auto rounded-xl bg-[#7b31f3] text-white transition duration-200 ease-in-out hover:bg-[#8d47fd] hover:scale-105 active:scale-100"
              >
                Update
              </button>
            )}
          </div>

          <h1 className="py-5 text-white ">
            <input type="checkbox" name="" id="" /> Show Finished
          </h1>
          <hr className="w-[90%] mx-auto" />

          <TaskList
            task={task}
            setTask={setTask}
            handleDelete={handleDelete}
            setActivity={setActivity}
            setUpdate={setUpdate}
            setEdit={setEdit}
            saveTask={saveTask} // Pass saveTask to TaskList
          />
        </div>
      </div>
    </>
  );
};

export default App;
