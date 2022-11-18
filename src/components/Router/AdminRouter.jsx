import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../AuthProvider/AuthProvider';
import useAdmin from '../Hooks/useAdmin';

const Adminrouter = ({children}) => {
    const {user, loading, logOut} = useContext(AuthContext);
    const [isAdmin, isAdminLoading] = useAdmin(user.email);
    const location = useLocation();
    const userLogOut = () => {
        logOut()
        .then(() => {
            // Sign-out successful.
          }).catch((error) => {
            // An error happened.
          });
    }

    if(loading || isAdminLoading) {
        return <progress className="progress w-56"></progress>
    }

    if(user && isAdmin) {
        return children;
    }
    userLogOut();
    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default Adminrouter;