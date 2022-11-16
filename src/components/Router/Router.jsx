import Main from "../layouts/Main";
import Appointment from "../Pages/Appointment/Appointment/Appointment";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Login/Register";

const { createBrowserRouter } = require("react-router-dom");

const router = createBrowserRouter ([
    {path: '/', element: <Main></Main>,
    children: [
        {path: '/', element: <Home></Home>},
        {path: 'appointment', element: <Appointment></Appointment>},
        {path: 'login', element: <Login></Login>},
        {path: 'register', element: <Register></Register>},
    ]
}
]);

export default router;