import { authContext } from "@/App"
import AlertDialogTemplate from "@/components/AlertDialogTemplate"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { PRODUCTION_URL, deleteUser } from "@/lib/http"
import { Avatar, AvatarImage } from "@radix-ui/react-avatar"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { UploadCloudIcon } from "lucide-react"
import { ChangeEvent, useContext, useState } from "react"
import { useNavigate } from "react-router"
import ClipLoader from "react-spinners/ClipLoader"

const SettingsPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, setUser, setIsAuth } = useContext(authContext);
  const [loading, setLoading] = useState(false);

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

  const handleUploadFile = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      setLoading(true);
      const data = new FormData();
      data.append("avatar", e.target?.files ? e.target.files[0] : "");
      const res = await axios({
        url: `${PRODUCTION_URL}/upload/avatar`,
        method: "POST",
        data,
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      })
      setUser(res.data.user);

      localStorage.setItem("token", res.data.token);

      toast({
        title: res.data.message
      })
    } catch (error) {
      // alert(error?.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="p-5">
      <div className="flex flex-col justify-center items-center">
        <Avatar className="relative group">
          {!loading && <AvatarImage src={user?.profilePicture} className="w-16 h-16 rounded-full cursor-pointer" />}
          {loading && <ClipLoader color="var(rgb(--foreground))" cssOverride={{ width: "20px", height: "20px" }} className="mr-2" />}
          <label htmlFor="file" className={`w-16 h-16 rounded-full cursor-pointer absolute top-0 left-0 group-hover:flex group-hover:z-10 bg-black opacity-70 hidden group-hover: justify-center group-hover:items-center`}>
            <UploadCloudIcon />
          </label>
          <input type="file" id="file" onChange={handleUploadFile} hidden />
        </Avatar>
        <h2 className="text-2xl mt-2">{user?.firstName + " " + user?.lastName}</h2>
        <div className="flex gap-2 items-center">
          <CardDescription>
            {user?.email}
          </CardDescription>
          {!user?.isEmailVerified && <Badge variant="destructive">Not verified</Badge>}
          {user?.isEmailVerified && <Badge variant="default">Verified</Badge>}
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