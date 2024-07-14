import { useEffect, useState } from "react";
import { apiUrl } from "../App";
import axios from "axios";
import { Input } from "../components/ui/input";
import CreateTodoForm from "../components/CreateTodoForm";
import { Button } from "../components/ui/button";
import { Trash2 } from "lucide-react";
import { Label } from "../components/ui/label";
import { Link } from "react-router-dom";
import { useToast } from "../components/ui/use-toast";

export interface Todo {
  id: string;
  title: string;
  isComplete: boolean;
}

function TodoPage() {
  const { toast } = useToast();
  const [todos, setTodos] = useState<Todo[]>([]);

  async function handleDelete(id: string) {
    try {
      await axios.delete(`${apiUrl}/${id}`);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      toast({ title: "Task Deleted!" });
    } catch (err) {
      toast({ title: "Oops, Something went wrong!", variant: "destructive" });
    }
  }

  async function handleIsCompleteChange(
    ev: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) {
    try {
      const res = await axios.patch(`${apiUrl}/${id}`, {
        isComplete: ev.target.checked,
      });
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? res.data : todo))
      );
    } catch (err) {
      console.log(err);
      toast({ title: "Oops, Something went wrong!", variant: "destructive" });
    }
  }

  useEffect(() => {
    async function getTodos() {
      try {
        const res = await axios.get(apiUrl);
        setTodos(res.data);
      } catch (err) {
        console.log(err);
        toast({ title: "Run the json-server dummy", variant: "destructive" });
      }
    }
    getTodos();
  }, []);

  return (
    <div className="py-8 flex flex-col items-center min-h-screen bg-slate-900">
      <div className="w-1/3 space-y-8">
        <h1 className="text-4xl text-white font-semibold">My Todos:</h1>
        <CreateTodoForm setTodos={setTodos} />
        <ul className="flex flex-col gap-4">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="px-4 flex justify-between items-center rounded-md shadow-md bg-slate-50"
            >
              <h3>{todo.title}</h3>
              <div className="flex gap-2 items-center">
                <Label htmlFor="isCompleteCheckbox">isComplete:</Label>
                <Input
                  id="isCompleteCheckbox"
                  type="checkbox"
                  className="w-4"
                  checked={todo.isComplete}
                  onChange={(ev) => handleIsCompleteChange(ev, todo.id)}
                />
                <Button variant="ghost" onClick={() => handleDelete(todo.id)}>
                  <Trash2 />
                </Button>
                <Link to={`${todo.id}`}>See More..</Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoPage;
