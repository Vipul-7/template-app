import { authContext } from "@/App"
import { FC, useContext } from "react"
import { Navigate } from "react-router";

const ProtectedRoute = ({ Component }: { Component: FC }) => {
    const { isAuth } = useContext(authContext);

    return (
        isAuth ? <Component /> : <Navigate to="/login" replace={true} />
    )
}

export default ProtectedRoute