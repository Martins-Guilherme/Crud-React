import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

import TaskPage from "./pages/TaskPage";
import EditTaskPage from "./pages/EditTaskPage";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { TasksProvider } from "./contexts/TaskContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/task",
    element: <TaskPage />
  },
  {
    path: "/task/edit",
    element: <EditTaskPage />
  }
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TasksProvider>
      <RouterProvider router={router} />
    </TasksProvider>
  </StrictMode>
);
