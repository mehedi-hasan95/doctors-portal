import DashboardLayout from "../layouts/DashboardLayout";
import Main from "../layouts/Main";
import Appointment from "../Pages/Appointment/Appointment/Appointment";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import MyAppointments from "../Pages/Dashboard/MyAppointments/MyAppointments";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Login/Register";
import PrivetRouter from "./PrivetRouter";

const { createBrowserRouter } = require("react-router-dom");

const router = createBrowserRouter ([
    {path: '/', element: <Main></Main>,
    children: [
        {path: '/', element: <Home></Home>},
        {path: 'appointment', element: <Appointment></Appointment>},
        {path: 'login', element: <Login></Login>},
        {path: 'register', element: <Register></Register>},
        
    ]
},
{path: 'dashboard', element: <PrivetRouter><DashboardLayout></DashboardLayout></PrivetRouter>,
        children: [
            {path: '/dashboard', element: <MyAppointments></MyAppointments>},
            {path: '/dashboard/users', element: <AllUsers></AllUsers>},
        ]
    },
]);

export default router;