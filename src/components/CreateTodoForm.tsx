import axios from "axios";
import { Todo } from "../pages/TodoPage";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { apiUrl } from "../App";

interface CreateTodoFormProps {
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

function CreateTodoForm({ setTodos }: CreateTodoFormProps) {
  async function handleCreateTodo(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const formElem = ev.currentTarget;
    const formData = new FormData(formElem);
    const title = formData.get("title");
    try {
      const res = await axios.post(apiUrl, { title, isComplete: false });
      setTodos((prevTodos) => [...prevTodos, res.data]);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <form onSubmit={handleCreateTodo} className="flex flex-col gap-4">
      <Input placeholder="Title..." name="title" />
      <Button type="submit" className="bg-green-700 ">
        Add Todo
      </Button>
    </form>
  );
}

export default CreateTodoForm;
