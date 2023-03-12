import CreateTask from "./components/CreateTask";
import TaskCard from "./components/TaskCard";
import TaskList from "./components/TaskList";

function App() {
  return (
    <main className="grid min-h-screen place-content-center">
      <div>
        <h1>TODO</h1>
        <TaskList />
      </div>
    </main>
  );
}

export default App;
