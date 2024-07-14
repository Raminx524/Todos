import { useEffect, useState } from "react";
import { apiUrl } from "../App";
import axios from "axios";
import { Input } from "../components/ui/input";
import CreateTodoForm from "../components/CreateTodoForm";

export interface Todo {
  id: string;
  title: string;
  isComplete: boolean;
}

function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    async function getTodos() {
      try {
        const res = await axios.get(apiUrl);
        setTodos(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    getTodos();
  }, []);

  return (
    <div>
      <h1>My Todos:</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <h3>{todo.title}</h3>
            <Input type="checkbox" checked={todo.isComplete} />
          </li>
        ))}
      </ul>
      <CreateTodoForm setTodos={setTodos} />
    </div>
  );
}

export default TodoPage;
