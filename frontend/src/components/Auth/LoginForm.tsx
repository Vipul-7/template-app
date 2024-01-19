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


interface Props {
    onSubmit: (values: LoginInputs) => void,
    isSending: boolean
}

const validate = (values: LoginInputs) => {
    const errors: LoginInputs = {};

    if (
        !values.email ||
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    ) {
        errors.email = "Enter a valid email address";
    }

    if (!values.password || values.password.length < 6) {
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

    const isNotValid =
        formik.errors.email ||
        formik.errors.password;

    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                    Login to get access for creating or editing the templates
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={formik.handleSubmit} id="loginForm">
                    <div className="grid w-full gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="email" className="flex justify-start">Email</Label>
                            <Input type="email" id="email" placeholder="Email" onChange={formik.handleChange}
                                value={formik.values.email} />
                            {formik.touched.email && formik.errors.email ? (
                                <div className="text-red-500">{formik.errors.email}</div>
                            ) : null}
                        </div>

                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="password" className="flex justify-start">Password</Label>
                            <Input type="password" id="password" placeholder="Password" onChange={formik.handleChange}
                                value={formik.values.password} />
                            {formik.touched.password && formik.errors.password ? (
                                <div className="text-red-500">{formik.errors.password}</div>
                            ) : null}
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex flex-col items-end space-y-2">
                {!props.isSending && (
                    // <Button disabled={isNotValid || props.isSending}>Submit</Button>
                    <Button disabled={props.isSending} type="submit" form="loginForm">Submit</Button>
                )}
                {props.isSending && (
                    <p>Loading...</p>
                )}
                <CardDescription className="">
                    Don't have account?{" "}
                    <Link to="/signup" className="text-blue-500 underline">Signup</Link>
                </CardDescription>
            </CardFooter>
        </Card>
    )
};

export default LoginForm;