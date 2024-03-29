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
import { SignupInputs } from "@/lib/types";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import GoogleAuth from "./GoogleAuth";
import { AxiosError } from "axios";
import ClipLoader from "react-spinners/ClipLoader";

interface Props {
    onSubmit: (values: SignupInputs) => void,
    isSending: boolean,
    isError: boolean,
    error: AxiosError | null
}

const validate = (values: SignupInputs) => {
    const errors: SignupInputs = {};

    if (!values.firstName) {
        errors.firstName = "Enter your firstName"
    }
    if (!values.lastName) {
        errors.lastName = "Enter your lastName"
    }

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

const SignupForm = (props: Props) => {
    const formik = useFormik({
        initialValues: {
            firstName: "",
            email: "",
            password: "",
            lastName: "",
        },
        validate,
        onSubmit: (values) => {
            props.onSubmit(values);
        },
    });

    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Create an account</CardTitle>
                <CardDescription>
                    Signup to get access for creating or editing the templates
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={formik.handleSubmit} id="signupForm">
                    <div className="grid w-full gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="firstName" className="flex justify-start">First Name</Label>
                            <Input id="firstName" placeholder="John" onChange={formik.handleChange}
                                value={formik.values.firstName} />
                            {formik.touched.firstName && formik.errors.firstName ? (
                                <div className="text-xs text-red-500">{formik.errors.firstName}</div>
                            ) : null}
                        </div>

                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="lastName" className="flex justify-start">Last Name</Label>
                            <Input id="lastName" placeholder="Doe" onChange={formik.handleChange}
                                value={formik.values.lastName} />
                            {formik.touched.lastName && formik.errors.lastName ? (
                                <div className="text-xs text-red-500">{formik.errors.lastName}</div>
                            ) : null}
                        </div>

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
            {props.isError && <p className="text-xs text-red-400">{(props.error?.response?.data as { message?: string })?.message ||
                'Default error message'}</p>}
            <CardFooter className="flex justify-between items-end space-y-2 space-x-3">
                <Link to="/login" >
                    <Button variant="secondary">Login</Button>
                </Link>

                <Button disabled={props.isSending} type="submit" form="signupForm">
                    {props.isSending && <ClipLoader cssOverride={{ width: "20px", height: "20px" }} className="mr-2" />}
                    <span>Submit</span>
                </Button>
            </CardFooter>
            <GoogleAuth />
        </Card>
    );
};

export default SignupForm;
