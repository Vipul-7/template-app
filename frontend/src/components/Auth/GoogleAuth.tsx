import { Separator } from "@radix-ui/react-dropdown-menu"
import { Button } from "../ui/button"
import GoogleIcon from "../ui/icons/GoogleIcon"
import { googleSignIn, queryClient } from "@/lib/http"
import { useContext, useState } from "react"
import { authContext } from "@/App"
import { useNavigate } from "react-router"
import { useGoogleLogin } from "@react-oauth/google"
import { useToast } from "../ui/use-toast"
import ClipLoader from "react-spinners/ClipLoader"

const GoogleAuth = () => {
    const { toast } = useToast();
    const { setIsAuth, setUser } = useContext(authContext);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const login = useGoogleLogin({
        onSuccess: async ({ code }) => {
            setIsLoading(true);
            const data = await googleSignIn({ code, toast });

            if (data) {
                toast({
                    title: data.message,
                })
                if (data.token) {
                    localStorage.setItem("token", data.token);
                    setUser(data.user);
                    setIsAuth(true);
                    navigate("/");
                }

                queryClient.invalidateQueries({ queryKey: ["user", data.user.id] });
            }
            setIsLoading(false);
        },
        flow: "auth-code",
    })

    return (
        <div className="px-7">
            <div className="flex items-center justify-between text-[#A1A1AA]">
                <Separator className="w-[25%] h-[1px] bg-[#A1A1AA]" />
                <span className="text-sm">OR CONTINUE WITH</span>
                <Separator className="w-[25%] h-[1px] bg-[#A1A1AA]" />
            </div>

            <Button variant="outline" className="w-full mt-5 mb-7" onClick={() => login()} disabled={isLoading}>
                {isLoading && <ClipLoader color="var(rgb(--foreground))" cssOverride={{ width: "20px", height: "20px" }} className="mr-2" />}
                <GoogleIcon className="w-5 h-5 mr-2 fill-primary" />
                <span>Google</span>
            </Button>
            {/* {isError && <div className="text-red-50">{error.message}</div>} */}
        </div>
    )
}

export default GoogleAuth