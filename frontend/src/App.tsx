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
import { createContext } from 'vm'
import React, { useState } from 'react'

export const authContext = React.createContext({
  isAuth: false,
  setIsAuth: (value: boolean) => { }
});

function App() {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {/* {children} */}
      <authContext.Provider value={{ isAuth, setIsAuth }}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<RootLayout />}>
                <Route index={true} element={<HomePage />}></Route>
                <Route path='signup' element={<SignupPage />}></Route>
                <Route path='login' element={<LoginPage />}></Route>
                <Route path='my-templates' element={<MyTemplatesPage />}></Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </authContext.Provider>

    </ThemeProvider>
  )
}

export default App
