import NavBar from "@/components/NavBar"
import { Toaster } from "@/components/ui/toaster"
import { Outlet } from "react-router"

const RootLayout = () => {
    // const { templateCreationData } = useContext(templateCreationContext);

    return (
        <>
            <NavBar />
            <Outlet />
            <Toaster />
        </>
    )
}

export default RootLayout