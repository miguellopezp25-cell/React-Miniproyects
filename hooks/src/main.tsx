import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { TasksApp } from "./reducer/TaskApp.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TasksApp />
  </StrictMode>
);
