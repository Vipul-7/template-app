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
import { LoginInputs } from "@/lib/types";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import GoogleAuth from "./GoogleAuth";
import { AxiosError } from "axios";


interface Props {
    onSubmit: (values: LoginInputs) => void,
    isSending: boolean,
    isError: boolean,
    error: AxiosError | null
}

const validate = (values: LoginInputs) => {
    const errors: LoginInputs = {};

    if (
        !values.email ||
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    ) {
        errors.email = "Enter a valid email address";
    }

    if (!values.password || values.password.length < 5) {
        errors.password = "Password must be atleast 5 characters";
    }

    return errors;
};

const LoginForm = (props: Props) => {
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validate,
        onSubmit: (values) => {
            props.onSubmit(values);
        },
    });

    return (
        <div>
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Welcome back</CardTitle>
                    <CardDescription>
                        Login to get access for creating or editing the templates
                    </CardDescription>
                </CardHeader>
                <CardContent className="pb-0">
                    <form onSubmit={formik.handleSubmit} id="loginForm">
                        <div className="grid w-full gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="email" className="flex justify-start">Email</Label>
                                <Input type="email" id="email" placeholder="m@example.com" onChange={formik.handleChange}
                                    value={formik.values.email} />
                                {formik.touched.email && formik.errors.email ? (
                                    <div className="text-xs text-red-500">{formik.errors.email}</div>
                                ) : null}
                            </div>

                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password" className="flex justify-start">Password</Label>
                                <Input type="password" id="password" placeholder="Atleast 5 characters long" onChange={formik.handleChange}
                                    value={formik.values.password} />
                                {formik.touched.password && formik.errors.password ? (
                                    <div className="text-xs text-red-500">{formik.errors.password}</div>
                                ) : null}
                            </div>
                        </div>
                    </form>
                </CardContent>
                {/* <CardDescription className="flex justify-end m-0 p-0">Forgot password?</CardDescription> */}
                <Link to="/reset-password/send-link">
                    <Button variant="link" className="flex justify-end ml-auto text-muted-foreground">Forgot password?</Button>
                </Link>
                {props.isError && <p className="text-xs text-red-400">{(props.error?.response?.data as { message?: string })?.message ||
                    'Default error message'}</p>}
                <CardFooter className="flex justify-between items-end space-y-2 space-x-3">
                    <Link to="/signup" >
                        <Button variant="secondary">Signup</Button>
                    </Link>
                    {!props.isSending && (
                        // <Button disabled={isNotValid || props.isSending}>Submit</Button>
                        <Button disabled={props.isSending} type="submit" form="loginForm">Submit</Button>
                    )}
                    {props.isSending && (
                        <p>Loading...</p>
                    )}
                    {/* <CardDescription className="">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-blue-500 underline">Signup</Link>
                </CardDescription> */}
                </CardFooter>
                <GoogleAuth />
            </Card>
        </div>
    )
};

export default LoginForm;