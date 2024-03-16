import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Menu from './Menu/Menu';
import ItemDisplay from './ItemDisplay/ItemDisplay';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Menu />
  },
  {
    path: "/item/:itemId",
    element: <ItemDisplay />,
    loader: ({ params }) => ({
      hi: 'This is id starting from 1: ' + (parseInt(params.itemId ?? '0') + 1)
    })
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);