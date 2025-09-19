import { ChevronLeftIcon } from "lucide-react";
import Title from "../components/Title";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useTasks } from "../contexts/TaskContext";
import AddTasks from "../components/AddTasks";

const EditTaskPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  // Supondo que onEditTaskSubmit venha de um contexto ou prop
  // const { onEditTaskSubmit } = useTasks();
  const { onEditTaskSubmit } = useTasks();

  const title = searchParams.get("nome");
  const description = searchParams.get("descricao");
  const id = searchParams.get("id");

  const handleEditSubmit = (nome: string, descricao: string) => {
    navigate("/"); // Navegar de volta após a edição
    if (id) {
      onEditTaskSubmit(id, nome, descricao);
      navigate("/"); // Navegar de volta para a home após a edição
    }
  };

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-screen h-screen flex justify-center p-6">
        <div className="w-[500px] space-y-3">
          <div className="flex justify-center relative mb-6">
            <button className="absolute left-0 top-0 bottom-0 text-slate-100">
              <ChevronLeftIcon onClick={() => navigate(-1)} />
            </button>
            <Title>Editar Tarefa</Title>
          </div>
          <AddTasks
            edit={true}
            onEditTaskSubmit={handleEditSubmit}
            initialTitle={title}
            initialDescription={description}
          />
        </div>
      </div>
    </div>
  );
};

export default EditTaskPage;
