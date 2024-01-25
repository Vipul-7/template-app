import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { ModeToggle } from "./ModeToggle";
import { useContext, useEffect, useState } from "react";
import { decodeToken } from "@/lib/decodeToken";
import { TokenData } from "@/lib/types";
import { authContext } from "@/App";
import { PlusIcon } from "lucide-react";

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
            <Link to="/" className="flex-[0.3%] text-start"><div className="text-xl font-bold">Templates</div></Link>
            <Link to="/create-template">
                <Button className="flex items-center">
                    <PlusIcon className="w-4 h-4" />
                    &nbsp;Create Template</Button>
            </Link>
            <div className="flex items-center space-x-4 flex-[0.3%] justify-end">
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
