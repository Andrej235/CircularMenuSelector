import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Menu from './Menu/Menu';
import ItemDisplay from './ItemDisplay/ItemDisplay';
import Error from './Error/Error';
import { itemLoader } from './ItemDisplay/ItemLoader';
import LoadingScreen from './LoadingScreen/LoadingScreen';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);

export default function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = createBrowserRouter([
    {
      path: "/",
      element:
        <Menu
          onUnmount={() => {
            console.log('unmounting menu');
            setIsLoading(false);
          }}
          onNavigate={() => {
            console.log('navigating from menu');
            // setIsLoading(true);
          }}
        />,
      errorElement: <Error />
    },
    {
      path: "/item/:itemId",
      element: <ItemDisplay />,
      loader: (x) => {
        return itemLoader(x, () => console.log('fuck u')
        );
      } //Item loader has to call setIsLoading(true)
    },
    {
      path: "/test/loadingscreen",
      element: <LoadingScreen hidden={false} />
    }
  ]);

  return (
    <div>
      <RouterProvider router={router} />

      <LoadingScreen hidden={!isLoading} />
    </div>
  );
}
