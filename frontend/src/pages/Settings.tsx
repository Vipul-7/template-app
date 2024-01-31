import { authContext } from "@/App"
import AlertDialogTemplate from "@/components/AlertDialogTemplate"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader } from "@/components/ui/card"
import { AlertDialog } from "@radix-ui/react-alert-dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { Separator } from "@radix-ui/react-dropdown-menu"
import { useContext } from "react"

interface Props {
  firstName: string,
  lastName: string
}

const SettingsPage = () => {
  const { user } = useContext(authContext);

  // http request to delete account
  // mutate function
  const deleteAccountHandler = () => {

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
          <Badge variant="destructive">Not verified</Badge>
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