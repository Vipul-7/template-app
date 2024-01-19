import { login, queryClient, signup } from "@/lib/http"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router"
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { LoginInputs, SignupInputs } from "@/lib/types";

const AuthPage = (props: { auth: string }) => {
  const navigate = useNavigate();

  const { mutate: loginMutate, isPending: isLoginPending, isError: isLoginError, error: loginError } = useMutation({
    mutationFn: login,
    onSuccess: (data: { token: string }) => {
      // if (data.error) {
      //   window.alert(data.error);
      // }

      if (data.token) {
        localStorage.setItem("token", data.token);
        navigate("/");
      }
      queryClient.invalidateQueries({ queryKey: ["user"] });
    }
  })

  const { mutate: signupMutate, isPending: isSignupPending, isError: isSignupError, error: signupError } = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      navigate("/login");
    }
  });

  const loginFormSubmitHandler = (loginData: LoginInputs) => {
    console.log(loginData);
    loginMutate(loginData);
  }
  const singupFormSubmitHandler = (signupData: SignupInputs) => {
    console.log(signupData);
    signupMutate(signupData);
  }

  return (
    <main className="flex justify-center items-center h-screen">
      <div>
        {props.auth === "login" && <LoginForm isSending={isLoginPending} onSubmit={loginFormSubmitHandler} />}
        {props.auth === "signup" && <SignupForm onSubmit={singupFormSubmitHandler} isSending={isSignupPending} />}
      </div>
    </main>
  )
}

export default AuthPage