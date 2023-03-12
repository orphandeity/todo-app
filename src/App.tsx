import CreateTask from "./components/CreateTask";
import TaskCard from "./components/TaskCard";
import { useTaskStore } from "./lib/store";

function App() {
  const { tasks } = useTaskStore();

  return (
    <main>
      <h1>TODO</h1>
      <CreateTask />
      <ul>
        {tasks.map((task) => (
          <TaskCard task={task} />
        ))}
      </ul>
    </main>
  );
}

export default App;
