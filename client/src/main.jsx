import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { KudosProvider } from './context/KudosContext.jsx'
import { createBrowserRouter, RouterProvider} from "react-router-dom"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App isCard={false}/>,
  },
  {
    path: "/boards/:boardId",
    element: <App isCard={true}/>,
  },
])

createRoot(document.getElementById('root')).render(
  <KudosProvider>
      <RouterProvider router={router}/>
  </KudosProvider>
) 
