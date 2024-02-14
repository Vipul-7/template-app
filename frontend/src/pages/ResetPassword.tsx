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
import { resetPassword } from "@/lib/http";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";

type Input = {
    password?: string,
    confirmPassword?: string
}

const validate = (values: Input) => {
    const errors: Input = {};

    if (!values.password || values.password.length < 5) {
        errors.password = "Password must be atleast 5 characters";
    }

    if (!values.confirmPassword) {
        errors.confirmPassword = "Confirm password is required";
    }

    if (values.password !== values.confirmPassword) {
        errors.confirmPassword = "Passwords do not match";
    }

    return errors;
};


const ResetPasswordPage = () => {
    const { toast } = useToast();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const formik = useFormik({
        initialValues: {
            password: "",
            confirmPassword: ""
        },
        validate,
        onSubmit: (values) => {
            mutate({ password: values.password, token: searchParams.get("token") });
        },
    });

    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: resetPassword,
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
                        Update your password
                    </CardDescription>
                </CardHeader>

                {isError && <p className="text-xs text-red-400">{((error as AxiosError)?.response?.data as { errors?: { msg?: string } })?.errors?.msg ||
                    'Default error message'}</p>}

                <CardContent>
                    <form onSubmit={formik.handleSubmit} id="reset-password">
                        <div className="grid w-full gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password" className="flex justify-start">Password</Label>
                                <Input type="password" id="password" placeholder="Atleast 5 characters long" onChange={formik.handleChange}
                                    value={formik.values.password} />
                                {formik.touched.password && formik.errors.password ? (
                                    <div className="text-xs text-red-500">{formik.errors.password}</div>
                                ) : null}
                            </div>

                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="confirmPassword" className="flex justify-start">Confirm Password</Label>
                                <Input type="password" id="confirmPassword" placeholder="Passwords should match" onChange={formik.handleChange}
                                    value={formik.values.confirmPassword} />
                                {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                                    <div className="text-xs text-red-500">{formik.errors.confirmPassword}</div>
                                ) : null}
                            </div>
                        </div>
                    </form>
                </CardContent>

                <CardFooter>
                    {!isPending && (
                        <Button disabled={isPending} type="submit" form="reset-password" className="w-full">Submit</Button>
                    )}
                    {isPending && (
                        <p>Loading...</p>
                    )}
                </CardFooter>
            </Card>
        </main>
    )
}

export default ResetPasswordPage;