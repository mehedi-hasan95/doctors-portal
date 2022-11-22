import DashboardLayout from "../layouts/DashboardLayout";
import Main from "../layouts/Main";
import About from "../Pages/About/About";
import Appointment from "../Pages/Appointment/Appointment/Appointment";
import Contact from "../Pages/Contact/Contact";
import AddDoctor from "../Pages/Dashboard/AddDoctor/AddDoctor";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import ManageDoctors from "../Pages/Dashboard/ManageDoctors/ManageDoctors";
import MyAppointments from "../Pages/Dashboard/MyAppointments/MyAppointments";
import Payment from "../Pages/Dashboard/Payment/Payment";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Login/Register";
import Reviews from "../Pages/Reviews/Reviews";
import Adminrouter from "./AdminRouter";
import PrivetRouter from "./PrivetRouter";

const { createBrowserRouter } = require("react-router-dom");

const router = createBrowserRouter ([
    {path: '/', element: <Main></Main>,
    children: [
        {path: '/', element: <Home></Home>},
        {path: 'appointment', element: <Appointment></Appointment>},
        {path: 'about', element: <About></About>},
        {path: 'contact', element: <Contact></Contact>},
        {path: 'reviews', element: <Reviews></Reviews>},
        {path: 'login', element: <Login></Login>},
        {path: 'register', element: <Register></Register>},
        
    ]
},
{path: 'dashboard', element: <PrivetRouter><DashboardLayout></DashboardLayout></PrivetRouter>,
        children: [
            {path: '/dashboard', element: <MyAppointments></MyAppointments>},
            {path: '/dashboard/users', element: <Adminrouter><AllUsers></AllUsers></Adminrouter>},
            {path: '/dashboard/adddoctor', element: <Adminrouter><AddDoctor></AddDoctor></Adminrouter>},
            {path: '/dashboard/mangagedoctors', element: <Adminrouter><ManageDoctors></ManageDoctors></Adminrouter>},
            {path: '/dashboard/payment/:id', element: <Payment></Payment>,
            loader: ({params}) => fetch(`https://doctors-portal-server-rose-six.vercel.app/booking/${params.id}`),
        },
        ]
    },
]);

export default router;