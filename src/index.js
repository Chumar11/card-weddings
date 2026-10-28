import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import App from './App';
import Blog from './componet/Blog';
import Faq from './componet/Faq';
import Blogdetailes from './componet/Blogdetailes';
import reportWebVitals from './reportWebVitals';
import Form from './componet/Form';
import Cart from './componet/Cart';
import Weather from './componet/Weather';

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
