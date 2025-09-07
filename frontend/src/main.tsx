import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import QuizScreen from "./Screen/Quiz.jsx";

import { HomeScreen } from "./Screen/Home.jsx";
import { ProviderQuiz } from './hook/ContextQuiz.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeScreen />,
  },
  {
    path: "/quiz/:materiaId", 
    element: <QuizScreen />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ProviderQuiz>
      <RouterProvider router={router} />
    </ProviderQuiz>
  </React.StrictMode>,
)
