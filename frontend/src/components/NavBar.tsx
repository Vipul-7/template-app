import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { ModeToggle } from "./ModeToggle";

const NavBar = () => {
    return (
        <nav className="flex justify-between items-center w-full h-20 p-2 border-b">
            <Link to="/" ><div className="text-xl font-bold">Templates</div></Link>
            <div className="flex items-center space-x-4">
                <Link to="/my-templates">
                    {/* <div className="text-sm text-gray-600">Your templates</div> */}
                    <Button variant="ghost">Your Templates</Button>
                </Link>
                <ModeToggle />
                <Link to="/login">
                    <Button>Sign-in</Button>
                </Link>
            </div>
        </nav>
    );
};

export default NavBar;
