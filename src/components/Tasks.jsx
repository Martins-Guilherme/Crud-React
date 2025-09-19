import { Check, ChevronRightIcon, Pencil, TrashIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

const Tasks = ({ tasks, onTaskClick, onDeletTaskClick, ...rest }) => {
  const navigate = useNavigate();

  function onSeeDetailsClick(task) {
    const query = new URLSearchParams();
    query.set("nome", task.nome);
    query.set("descricao", task.descricao);
    navigate(`/task?${query.toString()}`);
  }

  function onEditTaskClick(task) {
    const query = new URLSearchParams();
    query.set("nome", task.nome);
    query.set("id", task.id);
    query.set("descricao", task.descricao);
    navigate(`/task/edit?${query.toString()}`);
  }

  return (
    <ul className="space-y-4 p-6 bg-slate-200 rounded-md shadow">
      {tasks.map((task) => (
        <li className="flex gap-2" key={task.id}>
          <button
            onClick={() => {
              onTaskClick(task.id);
            }}
            className={`bg-slate-400 text-left text-white flex p-2 rounded-md justify-between w-full
            ${task.isCompleted && "line-through"}`}
          >
            {task.nome}
            {task.isCompleted && (
              <p className="text-green-700">
                <Check />
              </p>
            )}
          </button>
          <Button onClick={() => onEditTaskClick(task)}>
            <Pencil />
          </Button>
          <Button
            onClick={() => {
              onSeeDetailsClick(task);
            }}
          >
            <ChevronRightIcon />
          </Button>
          <Button
            onClick={() => {
              onDeletTaskClick(task.id);
            }}
          >
            <TrashIcon />
          </Button>
        </li>
      ))}
    </ul>
  );
};

export default Tasks;
