import { login, queryClient, signup } from "@/lib/http"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router"
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { LoginInputs, SignupInputs, User } from "@/lib/types";
// import { authContext } from "@/App";
import React, { useContext, useState } from "react";
import { authContext } from "@/App";
import { Axios, AxiosError } from "axios";


const AuthPage = (props: { auth: string }) => {
  const { setIsAuth, setUser } = useContext(authContext);
  const navigate = useNavigate();

  const { mutate: loginMutate, isPending: isLoginPending, isError: isLoginError, error: loginError } = useMutation({
    mutationFn: login,
    onSuccess: (data: { token: string, user: User }) => {
      // if (data.error) {
      //   window.alert(data.error);
      // }

      console.log(data);
      if (data.token) {
        localStorage.setItem("token", data.token);
        // localStorage.setItem("userId", data.userId);
        setUser(data.user)

        setIsAuth(true);
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
    loginMutate(loginData);
  }
  const singupFormSubmitHandler = (signupData: SignupInputs) => {
    signupMutate(signupData);
  }

  console.log(isLoginError, loginError, isSignupError, signupError)

  return (
    <main className="flex justify-center items-center h-screen">
      <div>
        {props.auth === "login" && <LoginForm isSending={isLoginPending} onSubmit={loginFormSubmitHandler} isError={isLoginError} error={loginError as AxiosError} />}
        {props.auth === "signup" && <SignupForm onSubmit={singupFormSubmitHandler} isSending={isSignupPending} isError={isSignupError} error={signupError as AxiosError} />}
      </div>
    </main>

  )
}

export default AuthPage