import CreateTask from "./components/CreateTask";
import TaskCard from "./components/TaskCard";
import TaskList from "./components/TaskList";
import { useTaskStore } from "./lib/store";

function App() {
  return (
    <main>
      <h1>TODO</h1>
      <TaskList />
    </main>
  );
}

export default App;
