import { useState } from "react";
import Input from "./Input";

interface AddTasksProps {
  onAddTaskSubmit?: (nome: string, descricao: string) => void;
  onEditTaskSubmit?: (nome: string, descricao: string) => void;
  edit?: boolean;
  initialTitle?: string | null;
  initialDescription?: string | null;
}

const AddTasks = ({ onAddTaskSubmit, onEditTaskSubmit, edit = false, initialTitle = "", initialDescription = "" }: AddTasksProps) => {
  const [nome, setTitle] = useState(initialTitle || "");
  const [descricao, setDescription] = useState(initialDescription || "");

  return (
    <>
      <div className="bg-slate-200 space-y-4 p-6 rounded-md shadow flex flex-col ">
        <Input
          type="text"
          placeholder="Digite o titulo da tarefa"
          value={nome}
          onChange={(event: any) => setTitle(event.target.value)}
        />
        <Input
          type="text"
          placeholder="Digite a descrição da tarefa"
          value={descricao}
          onChange={(event: any) => setDescription(event.target.value)}
        />
        <button
          onClick={() => {
            // Verificar se preenchido antes de enviar
            if (!descricao.trim() || !nome.trim()) {
              setTitle("");
              setDescription("");
              return alert("Preencha o título e a descrição da tarefa;.");
            }
            if (edit && onEditTaskSubmit) {
              onEditTaskSubmit(nome, descricao);
            } else if (onAddTaskSubmit) {
              onAddTaskSubmit(nome, descricao);
            }
            setTitle("");
            setDescription("");
          }}
          className="bg-slate-500 text-white px-4 py-2 rounded-md font-medium"
        >
          {!edit ? "Adicionar" : "Renomear"}
        </button>
      </div>
    </>
  );
};

export default AddTasks;
