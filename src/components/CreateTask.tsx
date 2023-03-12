import { useState } from "react";
import { useStore } from "../lib/store";

const CreateTask = () => {
  const [newTask, setNewTask] = useState("");

  const { create } = useStore();

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
        className="w-full"
      />
    </form>
  );
};

export default CreateTask;
