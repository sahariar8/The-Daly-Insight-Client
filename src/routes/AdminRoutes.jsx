import { useLocation } from "react-router-dom";
import useAdmin from "../assets/hook/useAdmin";
import useAuth from "../assets/hook/useAuth";

const AdminRoutes = ({children}) => {
    const [ isAdmin,isAdminLoading ] = useAdmin();
    const { user,loading } = useAuth();
    const location = useLocation();

    if(loading || isAdminLoading){
        return <span className="loading loading-dots loading-lg"></span>
    }
    if(user && isAdmin){
        return children;
    }

    return <Navigate  to='/login' state={{from: location}} replace ></Navigate>
   
};

export default AdminRoutes;