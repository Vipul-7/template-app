import { LogOutIcon, SettingsIcon } from "lucide-react"
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuSeparator } from "../ui/dropdown-menu"
import { Link } from "react-router-dom"

interface Props {
    children: any,
    logoutHandler: () => any
}

const DropDownProfile = ({ children, logoutHandler }: Props) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-50 p-2">
                <Link to="/settings">
                    <DropdownMenuItem className="cursor-pointer flex items-center">
                        <span>Settings &nbsp;&nbsp;</span>
                        <SettingsIcon className="h-4 w-4" />
                    </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logoutHandler} className="text-red-500 cursor-pointer flex items-center">
                    <span>Logout &nbsp;&nbsp;</span>
                    <LogOutIcon className="h-4 w-4" />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default DropDownProfile