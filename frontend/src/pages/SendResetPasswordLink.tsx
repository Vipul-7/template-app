import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormik } from "formik";
import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { sendResetPasswordLink } from "@/lib/http";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router";

const validate = (values: { email: string }) => {
    const errors: { email?: string } = {};

    if (
        !values.email ||
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    ) {
        errors.email = "Enter a valid email address";
    }

    return errors;
};


const SendResetPasswordLinkPage = () => {
    const { toast } = useToast();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validate,
        onSubmit: (values) => {
            mutate(values.email);
        },
    });

    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: sendResetPasswordLink,
        onSuccess: (data) => {
            toast({
                title: data.message
            })
            navigate("/login");
        }
    })

    return (
        <main className="flex justify-center items-center h-screen">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Reset password</CardTitle>
                    <CardDescription>
                        You will get email with reset password link from where you can set your new password
                    </CardDescription>
                </CardHeader>
                {isError && <p className="text-xs text-red-400">{((error as AxiosError)?.response?.data as { errors?: { msg?: string } })?.errors?.msg ||
                    'Default error message'}</p>}
                <CardContent>
                    <form onSubmit={formik.handleSubmit} id="send-link">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="email" className="flex justify-start">Email</Label>
                            <Input type="email" id="email" placeholder="m@example.com" onChange={formik.handleChange}
                                value={formik.values.email} />
                            {formik.touched.email && formik.errors.email ? (
                                <div className="text-xs text-red-500">{formik.errors.email}</div>
                            ) : null}
                        </div>
                    </form>
                </CardContent>

                <CardFooter>
                    {!isPending && (
                        <Button disabled={isPending} type="submit" form="send-link" className="w-full">Submit</Button>
                    )}
                    {isPending && (
                        <p>Loading...</p>
                    )}
                </CardFooter>
            </Card>
        </main>
    )
}

export default SendResetPasswordLinkPage;