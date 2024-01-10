import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Items from '../components/Items/Item';
import ItemDetails from '../components/ItemDetails/ItemDetails';
import Layout from './Layout';
import CreateItem from '../components/CreateItem/CreateItem';
import CurrentItems from '../components/CurrentItems/CurrentItems';
import UpdateItem from '../components/UpdateItem/UpdateItem';
import Cart from '../components/Cart/Cart';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Items />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "/items/:id",
        element: <ItemDetails />
      },
      {
        path: "/items/new",
        element: <CreateItem />
      },
      {
        path: "/items/current",
        element: <CurrentItems />
      },
      {
        path: "/items/:id/update",
        element: <UpdateItem />
      },
      {
        path: "/cart",
        element: <Cart />
      },
      {
        path: "/*",
        element: <h1>Page not found</h1>
      },
    ],
  },
]);
