import { Route, Routes } from "react-router-dom";
import TodoPage from "./pages/TodoPage";
import TodoDetailsPage from "./pages/TodoDetailsPage";
export const apiUrl = "http://localhost:8001/todos";

function App() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<TodoPage />} />
        <Route path=":id" element={<TodoDetailsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
