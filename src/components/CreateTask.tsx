import { useState } from "react";
import { useTaskStore } from "../lib/store";

const CreateTask = () => {
  const [newTask, setNewTask] = useState("");

  const { create } = useTaskStore();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    create(newTask);
    setNewTask("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Create new todo..."
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
    </form>
  );
};

export default CreateTask;
