import './App.css'
import { Route, Routes } from 'react-router'
import RootLayout from './pages/Root'
import { BrowserRouter } from 'react-router-dom'
import HomePage from './pages/Home'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/http'
import SignupPage from './pages/Signup'
import LoginPage from './pages/Login'

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index={true} element={<HomePage />}></Route>
            <Route path='signup' element={<SignupPage />}></Route>
            <Route path='login' element={<LoginPage />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
