import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Menu from './Menu/Menu';
import ItemDisplay from './ItemDisplay/ItemDisplay';
import Error from './Error/Error';
import { Args, itemLoader } from './ItemDisplay/ItemLoader';
import LoadingScreen from './LoadingScreen/LoadingScreen';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export default function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = createBrowserRouter([
    {
      path: "/",
      element:
        <Menu
          onStartLoadingItem={() => {
            setIsLoading(true);
            console.log('loading...', isLoading);
          }}
          onFinishLoadingItem={() => {
            setIsLoading(false);
            console.log('loaded', isLoading);
          }}
        />,
      errorElement: <Error />
    },
    {
      path: "/item/:itemId",
      element: <ItemDisplay />,
      loader: (x: Args) => itemLoader(x, () => setIsLoading(false))
    },
    {
      path: "/test/loadingscreen",
      element: <LoadingScreen />
    }
  ]);

  //Add a way to force the user to wait for the loading animation to complete
  function renderLoadingScreen() {
    return isLoading ? <LoadingScreen /> : null;
  }

  return (
    <>
      <RouterProvider router={router} />

      {renderLoadingScreen()}
    </>
  );
}
