import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { ModeToggle } from "./ModeToggle";
import { useContext, useEffect, useState } from "react";
import { decodeToken } from "@/lib/decodeToken";
import { TokenData } from "@/lib/types";
import { authContext } from "@/App";

const NavBar = () => {
    const { isAuth, setIsAuth } = useContext(authContext);
    const [tokenData, setTokenData] = useState<TokenData | null>(null);

    useEffect(() => {
        const decodedData = decodeToken();
        if (!decodedData) return;
        setIsAuth(true);
        setTokenData(decodedData);
    }, [isAuth]);

    const logoutHandler = () => {
        localStorage.removeItem("token");
        setIsAuth(false);
        setTokenData(null);
    }

    return (
        <nav className="flex justify-between items-center w-full h-18 p-2 border-b">
            <Link to="/" ><div className="text-xl font-bold">Templates</div></Link>
            <div className="flex items-center space-x-4">
                <Link to="/my-templates">
                    {/* <div className="text-sm text-gray-600">Your templates</div> */}
                    <Button variant="ghost">Your Templates</Button>
                </Link>
                <ModeToggle />
                {!tokenData && <Link to="/login">
                    <Button>Sign-in</Button>
                </Link>}
                {tokenData && <Button onClick={logoutHandler}>Logout</Button>}
            </div>
        </nav>
    );
};

export default NavBar;
