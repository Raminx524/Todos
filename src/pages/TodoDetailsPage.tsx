import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { useEffect, useState } from "react";
import { apiUrl } from "../App";
import axios from "axios";
import { Todo } from "./TodoPage";
import Loader from "../components/ui/Loader";
import { useToast } from "../components/ui/use-toast";

function TodoDetailsPage() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { id } = useParams();
  const [todo, setTodo] = useState<Todo | null>(null);
  useEffect(() => {
    async function getTodo() {
      try {
        const res = await axios.get(`${apiUrl}/${id}`);
        setTodo(res.data);
      } catch (err) {
        console.log(err);
        toast({ title: "Oops, Something went wrong!", variant: "destructive" });
        navigate(-1);
      }
    }
    getTodo();
  });
  return (
    <div className="py-8 flex flex-col items-center min-h-screen bg-slate-900">
      {todo ? (
        <Card>
          <CardHeader>
            <CardTitle>
              <h4>{todo.title}</h4>
            </CardTitle>
            <CardDescription>
              <span>if you had any content it would have been here</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Is Todo Completed? {`${todo.isComplete}`}</p>
          </CardContent>
        </Card>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default TodoDetailsPage;
