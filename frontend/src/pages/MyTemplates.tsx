import { authContext } from "@/App";
import { useContext, useEffect } from "react";
import { useNavigate, useNavigation } from "react-router";

const MyTemplatesPage = () => {
    const navigate = useNavigate();
    const { isAuth } = useContext(authContext);

    useEffect(() => {
        if (!isAuth) {
            navigate("/login")
        }
    }, [isAuth])

    return (
        <div>MyTemplates</div>
    )
}

export default MyTemplatesPage