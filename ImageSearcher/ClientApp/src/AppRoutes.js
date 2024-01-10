import { Developer } from "./components/Developer";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/developer',
    element: <Developer />
  }
];

export default AppRoutes;
