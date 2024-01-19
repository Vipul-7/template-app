import { Button } from "./ui/button";

const NavBar = () => {
  return (
    <nav className="flex justify-between items-center w-full h-16 bg-white p-2">
      <div className="text-xl font-bold text-gray-800">Templates</div>
      <div className="flex items-center space-x-4">
        <div className="text-sm text-gray-600">Your templates</div>
        <div className="space-x-2">
          <Button>Login</Button>
          <Button>Signup</Button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
