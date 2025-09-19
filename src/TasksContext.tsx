import { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface Task {
  id: string;
  nome: string;
  descricao: string;
  isCompleted: boolean;
}

interface TasksContextData {
  tasks: Task[];
  onAddTaskSubmit: (nome: string, descricao: string) => void;
  onDeletTaskClick: (taskId: string) => void;
  onEditTaskSubmit: (taskId: string, nome: string, descricao: string) => void;
  onTaskClick: (taskId: string) => void;
}

const TasksContext = createContext<TasksContextData>({} as TasksContextData);

export function TasksProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function onTaskClick(taskId: string) {
    const newTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
    );
    setTasks(newTasks);
  }

  function onDeletTaskClick(taskId: string) {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
  }

  function onAddTaskSubmit(nome: string, descricao: string) {
    const newTask: Task = { id: uuidv4(), nome, descricao, isCompleted: false };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  }

  function onEditTaskSubmit(taskId: string, nome: string, descricao: string) {
    const newTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, nome, descricao } : task
    );
    setTasks(newTasks);
  }

  return (
    <TasksContext.Provider value={{ tasks, onAddTaskSubmit, onDeletTaskClick, onEditTaskSubmit, onTaskClick }}>
      {children}
    </TasksContext.Provider>
  );
}

export function useTasks() {
  return useContext(TasksContext);
}
