import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { ActionFunctionArgs, LoaderFunctionArgs, ParamParseKey, Params, RouterProvider, createBrowserRouter } from "react-router-dom";
import Menu from './Menu/Menu';
import ItemDisplay from './ItemDisplay/ItemDisplay';
import Error from './Error/Error';

const pathName = {
  item: '/item/:itemId'
} as const;

interface Args extends ActionFunctionArgs {
  params: Params<ParamParseKey<typeof pathName.item>>;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Menu />,
    errorElement: <Error />
  },
  {
    path: "/item/:itemId",
    element: <ItemDisplay />,
    loader: ({ params }: Args) => {
      return {
        hi: 'This is id starting from 1: ' + (parseInt(params.itemId ?? '0') + 1)
      };
    }
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);