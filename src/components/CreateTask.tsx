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
      className="flex items-center gap-3 rounded-md bg-white p-4 shadow-sm focus-within:ring-4 focus-within:ring-_bright-blue dark:bg-_dt-very-dark-desaturated-blue"
    >
      <div className="aspect-square h-5 rounded-full border dark:border-_dt-very-dark-grayish-blue-2" />
      <input
        type="text"
        placeholder="Create new todo..."
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        className="flex-1 border-none p-0 text-xs placeholder:text-xs placeholder:text-_lt-dark-grayish-blue focus:ring-0 dark:bg-_dt-very-dark-desaturated-blue dark:text-_dt-light-grayish-blue dark:placeholder:text-_dt-dark-grayish-blue desktop:text-base desktop:placeholder:text-base"
      />
    </form>
  );
};

export default CreateTask;
