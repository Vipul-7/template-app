import { Separator } from "@radix-ui/react-dropdown-menu"
import { Button } from "../ui/button"
import GoogleIcon from "../ui/icons/GoogleIcon"
import { useQuery } from "@tanstack/react-query"
import { googleSignIn, queryClient } from "@/lib/http"
import { useContext, useState } from "react"
import { authContext } from "@/App"
import { useNavigate } from "react-router"
import { useGoogleLogin } from "@react-oauth/google"
import { useToast } from "../ui/use-toast"

const GoogleAuth = () => {
    const { toast } = useToast();
    const { setIsAuth, setUser } = useContext(authContext);
    const navigate = useNavigate();

    const login = useGoogleLogin({
        onSuccess: async ({ code }) => {
            const data = await googleSignIn({ code });

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
        },
        flow: "auth-code"
    })

    return (
        <div className="px-7">
            <div className="flex items-center justify-between text-[#A1A1AA]">
                <Separator className="w-[25%] h-[1px] bg-[#A1A1AA]" />
                <span className="text-sm">OR CONTINUE WITH</span>
                <Separator className="w-[25%] h-[1px] bg-[#A1A1AA]" />
            </div>

            <Button variant="outline" className="w-full mt-5 mb-7" onClick={() => login()}>
                <GoogleIcon className="w-5 h-5 mr-2 fill-white" />
                <span>Google</span>
            </Button>
            {/* {isError && <div className="text-red-50">{error.message}</div>} */}
        </div>
    )
}

export default GoogleAuth