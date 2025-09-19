import AddTasks from "./components/AddTasks";
import Tasks from "./components/Tasks";
import Title from "./components/Title";
import { useTasks } from "./contexts/TaskContext";

const App = () => {
  const { tasks, onAddTaskSubmit, onTaskClick, onDeletTaskClick } = useTasks();
  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-3">
        <Title>Gerenciador de Tarefas</Title>
        <AddTasks onAddTaskSubmit={onAddTaskSubmit} />
        <Tasks
          tasks={tasks}
          onTaskClick={onTaskClick}
          onDeletTaskClick={onDeletTaskClick}
        />
      </div>
    </div>
  );
};

export default App;
