import { useState } from "react";
import { useStore } from "../lib/store";
import { clsx } from "clsx";

const CreateTask = () => {
  const [newTask, setNewTask] = useState("");

  const { create } = useStore();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    create(newTask);
    setNewTask("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-3 rounded-md bg-white px-6 py-3 shadow-sm focus-within:ring-2 focus-within:ring-blue-300"
    >
      <div className="h-4 w-4 rounded-full border" />
      <input
        type="text"
        placeholder="Create new todo..."
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        className="flex-1 border-none p-0 placeholder:text-xs focus:ring-0"
      />
    </form>
  );
};

export default CreateTask;
