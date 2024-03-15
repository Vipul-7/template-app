import './App.css'
import { Route, Routes } from 'react-router'
import RootLayout from './pages/Root'
import { BrowserRouter } from 'react-router-dom'
import HomePage from './pages/Home'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/http'
import SignupPage from './pages/Signup'
import LoginPage from './pages/Login'
import MyTemplatesPage from './pages/MyTemplates'
import { ThemeProvider } from './components/theme/ThemeProvider'
import React, { useState } from 'react'
import CreateTemplatePage from './pages/CreateTemplatePage'
import ProtectedRoute from './components/ProtectedRoute'
import { GoogleOAuthProvider } from '@react-oauth/google';
import EditTemplatePage from './pages/EditTemplate'
import SettingsPage from './pages/Settings'
import { UserDetails } from "./lib/types"
import SendResetPasswordLinkPage from './pages/SendResetPasswordLink'
import ResetPasswordPage from './pages/ResetPassword'

const CLIENT_ID = import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID!;

export const authContext = React.createContext({
  isAuth: false,
  // @ts-ignore
  setIsAuth: (value: boolean) => { },
  user: null as UserDetails | null,
  // @ts-ignore
  setUser: (user: UserDetails | null) => { }
});

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState<UserDetails | null>(null);

  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <authContext.Provider value={{ isAuth, setIsAuth, user, setUser }}>
          <QueryClientProvider client={queryClient}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<RootLayout />}>
                  <Route index={true} element={<HomePage />}></Route>
                  <Route path='signup' element={<SignupPage />}></Route>
                  <Route path='login' element={<LoginPage />}></Route>
                  <Route path='reset-password'>
                    <Route index={true} element={<ResetPasswordPage />} />
                    <Route path='send-link' element={<SendResetPasswordLinkPage />} />
                  </Route>
                  {/* <Route path='template/:templateId' element={<TemplatePage />}></Route> */}
                  <Route path='my-templates' element={<ProtectedRoute Component={MyTemplatesPage} />}></Route>
                  <Route path='template/edit/:templateId' element={<EditTemplatePage />} />
                  <Route path='create-template' element={<ProtectedRoute Component={CreateTemplatePage} />} ></Route>
                  <Route path='settings' element={<ProtectedRoute Component={SettingsPage} />}></Route>
                </Route>
              </Routes>
            </BrowserRouter>
          </QueryClientProvider>
        </authContext.Provider>
      </ThemeProvider>
    </GoogleOAuthProvider>
  )
}

export default App;