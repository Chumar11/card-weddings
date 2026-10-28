import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
let rout =createBrowserRouter([
  {
    path:'/',
    element:<App/>,
  },
]) ;
root.render(

   <RouterProvider router={rout}>
      {/* Your application components go here */}
    </RouterProvider>

);

reportWebVitals();
