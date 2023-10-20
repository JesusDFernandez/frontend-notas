import { createContext, useContext, useState } from "react";
import {
  createTaskRequest,
  deleteTaskRequest,
  getTasksRequest,
  getTaskRequest,
  updateTaskRequest,
} from "../api/tasks";

const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTasks must be used within a TaskProvider");
  return context;
};

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);

  const getTasks = async () => {
    const res = await getTasksRequest();
    setTasks(res.data);
  };

  const deleteTask = async (id) => {
    try {

      const res = await deleteTaskRequest(id);

      setRefresh(!refresh);

      if (res.status === 204) setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const createTask = async (task) => {

    try {

      const res = await createTaskRequest(task);

      if (res.status === 200) {
        setRefresh(!refresh);

      }
      // }
    } catch (error) {
      console.log(error);
    }

  };

  const getTask = async (id) => {
    try {
      const res = await getTaskRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateTask = async (id, task) => {
    try {
      setLoading(true)

      const res = await updateTaskRequest(id, task);
      if (res.status === 200) {
        setRefresh(!refresh);
        setLoading(false)
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        refresh,
        loading,
        getTasks,
        deleteTask,
        createTask,
        getTask,
        updateTask,
        setTasks
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
