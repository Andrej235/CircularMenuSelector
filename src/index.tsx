import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Menu from './Menu/Menu';
import ItemDisplay from './ItemDisplay/ItemDisplay';
import Error from './Error/Error';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Menu />,
    errorElement: <Error />
  },
  {
    path: "/item/:itemId",
    element: <ItemDisplay />,
    loader: ({ params }) => ({
      //@ts-expect-error
      hi: 'This is id starting from 1: ' + (parseInt(params.itemId) + 1)
    })
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);