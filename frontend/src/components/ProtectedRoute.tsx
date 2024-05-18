import { authContext } from "@/App";
import { FC, useContext, useEffect } from "react";
import { Navigate } from "react-router";

const ProtectedRoute: FC<{ Component: FC }> = ({ Component }) => {
    const { isAuth ,user} = useContext(authContext);

    return isAuth ? <Component /> : <Navigate to="/login" replace={true} />;
};

export default ProtectedRoute;
