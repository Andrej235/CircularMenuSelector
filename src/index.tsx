import ReactDOM from 'react-dom/client';
import './index.scss';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Menu from './Menu/Menu';
import ItemDisplay from './ItemDisplay/ItemDisplay';
import Error from './Error/Error';
import { itemLoader } from './ItemDisplay/ItemLoader';
import { StrictMode } from 'react';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Menu />,
    errorElement: <Error />
  },
  {
    path: "/item/:itemId",
    element: <ItemDisplay />,
    loader: itemLoader
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);