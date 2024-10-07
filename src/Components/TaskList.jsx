import React from 'react';
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { CiSquareCheck } from "react-icons/ci";

const TaskList = ({ task, setTask, setActivity, setUpdate, setEdit, saveTask }) => {

  // Handle edit functionality
  const handleEdit = (id) => {
    const findItem = task.find((elem) => elem.id === id);
    setActivity(findItem.title);
    setUpdate(false);
    setEdit(id);
  };

  // Handle delete functionality
  const handleDelete = (id) => {
    const isConfirm = window.confirm('Are you sure you want to delete this task?');
    if (isConfirm) {
      const filteredTasks = task.filter((item) => item.id !== id);
      setTask(filteredTasks);
      saveTask(filteredTasks); // Save after delete
    }
  };

  // Handle remove all functionality
  const handleRemove = () => {
    const isConfirm = window.confirm('Are you sure you want to delete all tasks?');
    if (isConfirm) {
      setTask([]);
      saveTask([]); // Save after removing all tasks
    }
  };

  // Handle checkbox functionality for marking tasks as complete
  const handleCheck = (id) => {
    const updatedTasks = task.map((compItem) => {
      if (compItem.id === id) {
        return { ...compItem, complete: !compItem.complete };
      }
      return compItem;
    });
    setTask(updatedTasks);
    saveTask(updatedTasks); // Save after checking task
  };

  return (
    <div>
      <h3 className='text-2xl font-semibold text-white mt-4'>Your Todos</h3>
      {task.map((TaskList) => (
        <div
          className={`flex my-3 justify-between items-center text-white ${TaskList.complete ? 'line-through' : ''}`}
          key={TaskList.id}
        >
          <div className='flex items-center gap-2'>
            <span className='cursor-pointer'>
              <CiSquareCheck size={18} className='mt-1' onClick={() => handleCheck(TaskList.id)} />
            </span>
            <div>{TaskList.title}</div>
          </div>
          <div className="buttons flex h-full">
            <button
              onClick={() => handleEdit(TaskList.id)}
              className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'
            >
              <FaEdit />
            </button>
            <button
              onClick={() => handleDelete(TaskList.id)}
              className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'
            >
              <AiFillDelete />
            </button>
          </div>
        </div>
      ))}

      {task.length >= 1 && (
        <div className='w-full mb-20 bg-yellow-400 relative'>
          <button
            onClick={handleRemove}
            className='absolute right- mt-4 active::scale-90 hover:scale-105 bg-red-600 rounded-lg text-white px-2 py-1'
          >
            Remove All
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskList;
