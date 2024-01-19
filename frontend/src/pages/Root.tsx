import NavBar from "@/components/NavBar"
import { Outlet } from "react-router"

const RootLayout = () => {
    return (
        <>
            <NavBar />
            <Outlet />
        </>
    )
}

export default RootLayout