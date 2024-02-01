import { authContext } from "@/App"
import AlertDialogTemplate from "@/components/AlertDialogTemplate"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { deleteUser } from "@/lib/http"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useContext } from "react"
import { useNavigate } from "react-router"

const SettingsPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, setUser, setIsAuth } = useContext(authContext);

  const { mutate } = useMutation({
    mutationKey: ["user", user?.id],
    mutationFn: deleteUser,
    onSuccess: (data) => {
      localStorage.removeItem("token");
      setUser(null);
      setIsAuth(false);
      navigate("/");

      toast({
        title: data.message
      })
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        // Handle Axios errors
        const errorMessage = error.response?.data?.message || "An error occurred";
        toast({
          title: errorMessage,
          variant: "destructive"
        });
      } else {
        // Handle other types of errors
        toast({
          title: error.message || "An error occurred",
          variant: "destructive"
        });
      }
    }
  });

  const deleteAccountHandler = () => {
    if (user?.id) {
      mutate(user.id)
    } else {
      toast({
        title: "User not found",
        variant: "destructive"
      })
    }
  }

  return (
    <main className="p-5">
      <div className="flex flex-col justify-center items-center">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" className="w-16 h-16 rounded-full cursor-pointer" />
          <AvatarFallback>Avatar{" "}</AvatarFallback>
        </Avatar>
        <h2 className="text-2xl mt-2">{user?.firstName + " " + user?.lastName}</h2>
        <div className="flex gap-2 items-center">
          <CardDescription>
            {user?.email}
          </CardDescription>
          {!user?.isEmailVerified && <Badge variant="destructive">Not verified</Badge>}
          {/* <Button variant="link" className="p-1">Verify email</Button> */}
        </div>

        <Card className="w-[50%] mt-4 border border-red-400">
          <CardHeader className="p-5 text-start pb-3">
            Delete account
          </CardHeader>
          <CardDescription className="text-start p-5 pt-0">
            Permanently remove your Personal Account and all of its contents from the template platform. This action is not reversible, so please continue with caution.
          </CardDescription>
          <div className="bg-[#2A1314] p-5 flex justify-end border border-red-400">
            <AlertDialogTemplate deleteTemplateHandler={deleteAccountHandler} dialogDescription="">
              <Button variant="destructive">Delete Personal Account</Button>
            </AlertDialogTemplate>
          </div>
        </Card>
      </div>
    </main>
  )
}

export default SettingsPage