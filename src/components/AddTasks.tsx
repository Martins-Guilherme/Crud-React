import { useState } from "react";
import Input from "./Input";

interface AddTasksProps {
  onAddTaskSubmit: (nome: string, descricao: string) => void;
}

const AddTasks = ({ onAddTaskSubmit }: AddTasksProps) => {
  const [nome, setTitle] = useState("");
  const [descricao, setDescription] = useState("");

  return (
    <>
      <div className="bg-slate-200 space-y-4 p-6 rounded-md shadow flex flex-col ">
        <Input
          type="text"
          placeholder="Digite o titulo da tarefa"
          value={nome}
          onChange={(event) => setTitle(event.target.value)}
        />
        <Input
          type="text"
          placeholder="Digite a descrição da tarefa"
          value={descricao}
          onChange={(event) => setDescription(event.target.value)}
        />
        <button
          onClick={() => {
            // Verificar se preenchido antes de enviar
            if (!descricao.trim() || !nome.trim()) {
              setTitle("");
              setDescription("");
              return alert("Preencha o título e a descrição da tarefa;.");
            }
            onAddTaskSubmit(nome, descricao);
            setTitle("");
            setDescription("");
          }}
          className="bg-slate-500 text-white px-4 py-2 rounded-md font-medium"
        >
          Adicionar
        </button>
      </div>
    </>
  );
};

export default AddTasks;
