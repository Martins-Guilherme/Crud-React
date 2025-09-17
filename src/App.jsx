import { v4 } from "uuid";
import { useEffect, useState } from "react";
import AddTasks from "./components/AddTasks";
import Tasks from "./components/Tasks";
import Title from "./components/Title";

const App = () => {
  // Dados mockados
  // JSON.parse(localStorage.getItem("tasks"))
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // CHAMAR API
  // useEffect(() => {
  //   async function fetchTask() {
  //     const VITE_URL = import.meta.env.VITE_URL;

  //     const response = await fetch(
  //       `http://localhost:5000/presentes/listar?token=${VITE_URL}`,
  //       {
  //         method: "GET"
  //       }
  //     );
  //     // PEGAR OS DADOS QUE ELA RETORNA
  //     const data = await response.json();

  //     // SALVAR OS DADOS NO ESTADO
  //     setTasks(data);
  //   }
  //   // fetchTask();
  // }, []);

  function onTaskClick(taskId) {
    const newTasks = tasks.map((task) => {
      // PRECISO ATUALIZAR ESSA TAREFA
      if (task.id === taskId) {
        return { ...task, isCompleted: !task.isCompleted };
      }
      // Se passar pelo IF não precoisa atualizar a tarefa
      return task;
    });
    setTasks(newTasks);
  }

  function onDeletTaskClick(taskId) {
    const novaLista = tasks.filter((task) => task.id !== taskId);
    setTasks(novaLista);
  }

  function onAddTaskSubmit(nome, descricao) {
    const newTask = {
      id: v4(),
      nome,
      descricao,
      isCompleted: false
    };
    setTasks([...tasks, newTask]);
  }

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
