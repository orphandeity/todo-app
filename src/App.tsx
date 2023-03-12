import { useEffect, useState } from "react";
import TaskList from "./components/TaskList";
import DarkModeToggle from "./components/DarkModeToggle";

function App() {
  return (
    <main className="mx-auto min-h-screen max-w-sm p-6 dark:bg-gray-300">
      <div>
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold tracking-widest">TODO</h1>
          <DarkModeToggle />
        </div>
        <TaskList />
      </div>
    </main>
  );
}

export default App;
