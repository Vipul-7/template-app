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
import { ThemeProvider } from './components/ThemeProvider'
import React, { useState } from 'react'
import CreateTemplatePage from './pages/CreateTemplatePage'
import ProtectedRoute from './components/ProtectedRoute'
import { GoogleOAuthProvider } from '@react-oauth/google';
import EditTemplatePage from './pages/EditTemplate'

const CLIENT_ID = import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID!;

export const authContext = React.createContext({
  isAuth: false,
  setIsAuth: (value: boolean) => { }
});

function App() {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <authContext.Provider value={{ isAuth, setIsAuth }}>
          <QueryClientProvider client={queryClient}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<RootLayout />}>
                  <Route index={true} element={<HomePage />}></Route>
                  <Route path='signup' element={<SignupPage />}></Route>
                  <Route path='login' element={<LoginPage />}></Route>
                  {/* <Route path='template/:templateId' element={<TemplatePage />}></Route> */}
                  <Route path='my-templates' element={<ProtectedRoute Component={MyTemplatesPage} />}></Route>
                  <Route path='template/edit/:templateId' element={<EditTemplatePage />} />
                  <Route path='create-template' element={<ProtectedRoute Component={CreateTemplatePage} />} ></Route>
                </Route>
              </Routes>
            </BrowserRouter>
          </QueryClientProvider>
        </authContext.Provider>
      </ThemeProvider>
    </GoogleOAuthProvider>
  )
}

export default App
