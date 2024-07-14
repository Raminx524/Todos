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
      const res = await axios.post(apiUrl, { title: formElem.title });
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <form onSubmit={handleCreateTodo}>
      <Input placeholder="Title..." name="title" />
      <Button type="submit">Add Todo</Button>
    </form>
  );
}

export default CreateTodoForm;
