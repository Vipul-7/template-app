import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { ModeToggle } from "./theme/ModeToggle";
import { useContext, useEffect, useState } from "react";
import { decodeToken } from "@/lib/decodeToken";
import { TokenData, User } from "@/lib/types";
import { authContext } from "@/App";
import { PlusIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import DropDownProfile from "./DropDownProfile";
import { JwtPayload } from "jsonwebtoken";

interface CustomizedJwtPayload extends JwtPayload {
    user: User
}

const NavBar = () => {
    const { isAuth, setIsAuth, setUser, user } = useContext(authContext);

    useEffect(() => {
        const decodedData: CustomizedJwtPayload | null = decodeToken() as CustomizedJwtPayload;
        if (!decodedData) return;
        setIsAuth(true);
        setUser(decodedData.user);
    }, [isAuth]);

    const logoutHandler = () => {
        localStorage.removeItem("token");
        setUser(null);
        setIsAuth(false);
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
                {!isAuth && <Link to="/login">
                    <Button>Sign-in</Button>
                </Link>}
                {isAuth &&
                    <div>
                        <DropDownProfile logoutHandler={logoutHandler}>
                            <Avatar>
                                <AvatarImage src={user?.profilePicture} className="w-10 h-10 rounded-full cursor-pointer" />
                                <AvatarFallback>Avatar{" "}</AvatarFallback>
                            </Avatar>
                        </DropDownProfile>
                        {/* <Button onClick={logoutHandler}>Logout</Button> */}
                    </div>
                }
            </div>
        </nav>
    );
};

export default NavBar;
