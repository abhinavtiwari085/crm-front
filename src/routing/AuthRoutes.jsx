import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

function AuthRoutes({ allowListedRoles }) {
    //allowListedRoles={["admin"]} format in mainroute.jsx 
    const {role} = useSelector((state) => state.auth); // get the role of the current user from state
    return (
        <>
        {/* ..will traverse in allowListedRoles array mean given role =admin */} 
        {allowListedRoles.find((givenRole) => givenRole == role) ? <Outlet/> : <div>denied</div>}
        </>
    );
}

export default AuthRoutes;